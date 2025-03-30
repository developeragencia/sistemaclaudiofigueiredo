from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from ....core.deps import get_db, get_current_user
from ....models.usuario import Usuario
from ....models.cliente import Cliente

router = APIRouter()

@router.get("/", response_model=List[Cliente])
def read_clientes(
    *,
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: Usuario = Depends(get_current_user),
) -> Any:
    """
    Recuperar clientes.
    """
    clientes = db.exec(select(Cliente).offset(skip).limit(limit)).all()
    return clientes

@router.post("/", response_model=Cliente)
def create_cliente(
    *,
    db: Session = Depends(get_db),
    cliente_in: Cliente,
    current_user: Usuario = Depends(get_current_user),
) -> Any:
    """
    Criar novo cliente.
    """
    cliente = db.exec(select(Cliente).where(Cliente.cnpj == cliente_in.cnpj)).first()
    if cliente:
        raise HTTPException(
            status_code=400,
            detail="Cliente com este CNPJ já existe no sistema."
        )
    cliente = Cliente.from_orm(cliente_in)
    db.add(cliente)
    db.commit()
    db.refresh(cliente)
    return cliente

@router.get("/{cliente_id}", response_model=Cliente)
def read_cliente(
    *,
    db: Session = Depends(get_db),
    cliente_id: int,
    current_user: Usuario = Depends(get_current_user),
) -> Any:
    """
    Obter cliente por ID.
    """
    cliente = db.get(Cliente, cliente_id)
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente não encontrado")
    return cliente

@router.put("/{cliente_id}", response_model=Cliente)
def update_cliente(
    *,
    db: Session = Depends(get_db),
    cliente_id: int,
    cliente_in: Cliente,
    current_user: Usuario = Depends(get_current_user),
) -> Any:
    """
    Atualizar cliente.
    """
    cliente = db.get(Cliente, cliente_id)
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente não encontrado")
    
    # Verificar se o novo CNPJ já existe (se foi alterado)
    if cliente_in.cnpj != cliente.cnpj:
        existing = db.exec(select(Cliente).where(Cliente.cnpj == cliente_in.cnpj)).first()
        if existing:
            raise HTTPException(
                status_code=400,
                detail="Cliente com este CNPJ já existe no sistema."
            )
    
    cliente_data = cliente_in.dict(exclude_unset=True)
    for field in cliente_data:
        setattr(cliente, field, cliente_data[field])
    
    db.add(cliente)
    db.commit()
    db.refresh(cliente)
    return cliente

@router.delete("/{cliente_id}")
def delete_cliente(
    *,
    db: Session = Depends(get_db),
    cliente_id: int,
    current_user: Usuario = Depends(get_current_user),
) -> Any:
    """
    Deletar cliente.
    """
    cliente = db.get(Cliente, cliente_id)
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente não encontrado")
    
    # Soft delete
    cliente.active = False
    db.add(cliente)
    db.commit()
    return {"ok": True}

@router.get("/search/", response_model=List[Cliente])
def search_clientes(
    *,
    db: Session = Depends(get_db),
    query: str,
    current_user: Usuario = Depends(get_current_user),
) -> Any:
    """
    Pesquisar clientes por nome, CNPJ ou email.
    """
    clientes = db.exec(
        select(Cliente).where(
            (Cliente.nome.contains(query)) |
            (Cliente.cnpj.contains(query)) |
            (Cliente.email.contains(query))
        )
    ).all()
    return clientes 