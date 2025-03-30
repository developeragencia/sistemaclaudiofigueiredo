from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlmodel import Session, select
from datetime import date
from ....core.deps import get_db, get_current_user
from ....models.usuario import Usuario
from ....models.pagamento import Pagamento
from ....models.cliente import Cliente
from ....models.fornecedor import Fornecedor
from ....services.pagamento import processar_pagamento, calcular_retencao

router = APIRouter()

@router.get("/", response_model=List[Pagamento])
def read_pagamentos(
    *,
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: Usuario = Depends(get_current_user),
) -> Any:
    """
    Recuperar pagamentos.
    """
    pagamentos = db.exec(select(Pagamento).offset(skip).limit(limit)).all()
    return pagamentos

@router.post("/", response_model=Pagamento)
async def create_pagamento(
    *,
    db: Session = Depends(get_db),
    pagamento_in: Pagamento,
    background_tasks: BackgroundTasks,
    current_user: Usuario = Depends(get_current_user),
) -> Any:
    """
    Criar novo pagamento.
    """
    # Verificar se o fornecedor existe
    fornecedor = db.get(Fornecedor, pagamento_in.fornecedor_id)
    if not fornecedor:
        raise HTTPException(
            status_code=404,
            detail="Fornecedor não encontrado"
        )
    
    # Verificar se o cliente existe (se fornecido)
    if pagamento_in.cliente_id:
        cliente = db.get(Cliente, pagamento_in.cliente_id)
        if not cliente:
            raise HTTPException(
                status_code=404,
                detail="Cliente não encontrado"
            )
        
        # Calcular retenção baseado no regime tributário do cliente
        valor_retencao = calcular_retencao(
            valor_total=pagamento_in.valor_total,
            percentual_retencao=cliente.percentual_retencao
        )
        pagamento_in.valor_retencao = valor_retencao
        pagamento_in.valor_liquido = pagamento_in.valor_total - valor_retencao
    
    pagamento = Pagamento.from_orm(pagamento_in)
    pagamento.processado_por = current_user.email
    
    db.add(pagamento)
    db.commit()
    db.refresh(pagamento)
    
    # Processar pagamento em background se estiver pendente
    if pagamento.status == "PENDENTE":
        background_tasks.add_task(processar_pagamento, pagamento.id)
    
    return pagamento

@router.get("/{pagamento_id}", response_model=Pagamento)
def read_pagamento(
    *,
    db: Session = Depends(get_db),
    pagamento_id: int,
    current_user: Usuario = Depends(get_current_user),
) -> Any:
    """
    Obter pagamento por ID.
    """
    pagamento = db.get(Pagamento, pagamento_id)
    if not pagamento:
        raise HTTPException(status_code=404, detail="Pagamento não encontrado")
    return pagamento

@router.put("/{pagamento_id}", response_model=Pagamento)
def update_pagamento(
    *,
    db: Session = Depends(get_db),
    pagamento_id: int,
    pagamento_in: Pagamento,
    current_user: Usuario = Depends(get_current_user),
) -> Any:
    """
    Atualizar pagamento.
    """
    pagamento = db.get(Pagamento, pagamento_id)
    if not pagamento:
        raise HTTPException(status_code=404, detail="Pagamento não encontrado")
    
    if pagamento.status != "PENDENTE":
        raise HTTPException(
            status_code=400,
            detail="Apenas pagamentos pendentes podem ser atualizados"
        )
    
    pagamento_data = pagamento_in.dict(exclude_unset=True)
    for field in pagamento_data:
        setattr(pagamento, field, pagamento_data[field])
    
    db.add(pagamento)
    db.commit()
    db.refresh(pagamento)
    return pagamento

@router.delete("/{pagamento_id}")
def delete_pagamento(
    *,
    db: Session = Depends(get_db),
    pagamento_id: int,
    current_user: Usuario = Depends(get_current_user),
) -> Any:
    """
    Cancelar pagamento.
    """
    pagamento = db.get(Pagamento, pagamento_id)
    if not pagamento:
        raise HTTPException(status_code=404, detail="Pagamento não encontrado")
    
    if pagamento.status not in ["PENDENTE", "PROCESSANDO"]:
        raise HTTPException(
            status_code=400,
            detail="Apenas pagamentos pendentes ou em processamento podem ser cancelados"
        )
    
    pagamento.status = "CANCELADO"
    db.add(pagamento)
    db.commit()
    return {"ok": True}

@router.get("/vencimento/{data}", response_model=List[Pagamento])
def get_pagamentos_by_vencimento(
    *,
    db: Session = Depends(get_db),
    data: date,
    current_user: Usuario = Depends(get_current_user),
) -> Any:
    """
    Obter pagamentos por data de vencimento.
    """
    pagamentos = db.exec(
        select(Pagamento).where(Pagamento.data_vencimento == data)
    ).all()
    return pagamentos

@router.get("/status/{status}", response_model=List[Pagamento])
def get_pagamentos_by_status(
    *,
    db: Session = Depends(get_db),
    status: str,
    current_user: Usuario = Depends(get_current_user),
) -> Any:
    """
    Obter pagamentos por status.
    """
    pagamentos = db.exec(
        select(Pagamento).where(Pagamento.status == status)
    ).all()
    return pagamentos 