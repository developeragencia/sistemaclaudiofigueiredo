from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from ....core.deps import get_db, get_current_user
from ....models.usuario import Usuario
from ....models.fornecedor import Fornecedor

router = APIRouter()

@router.get("/", response_model=List[Fornecedor])
def read_fornecedores(
    *,
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: Usuario = Depends(get_current_user),
) -> Any:
    """
    Recuperar fornecedores.
    """
    fornecedores = db.exec(select(Fornecedor).offset(skip).limit(limit)).all()
    return fornecedores

@router.post("/", response_model=Fornecedor)
def create_fornecedor(
    *,
    db: Session = Depends(get_db),
    fornecedor_in: Fornecedor,
    current_user: Usuario = Depends(get_current_user),
) -> Any:
    """
    Criar novo fornecedor.
    """
    fornecedor = db.exec(select(Fornecedor).where(Fornecedor.cnpj == fornecedor_in.cnpj)).first()
    if fornecedor:
        raise HTTPException(
            status_code=400,
            detail="Fornecedor com este CNPJ já existe no sistema."
        )
    fornecedor = Fornecedor.from_orm(fornecedor_in)
    db.add(fornecedor)
    db.commit()
    db.refresh(fornecedor)
    return fornecedor

@router.get("/{fornecedor_id}", response_model=Fornecedor)
def read_fornecedor(
    *,
    db: Session = Depends(get_db),
    fornecedor_id: int,
    current_user: Usuario = Depends(get_current_user),
) -> Any:
    """
    Obter fornecedor por ID.
    """
    fornecedor = db.get(Fornecedor, fornecedor_id)
    if not fornecedor:
        raise HTTPException(status_code=404, detail="Fornecedor não encontrado")
    return fornecedor

@router.put("/{fornecedor_id}", response_model=Fornecedor)
def update_fornecedor(
    *,
    db: Session = Depends(get_db),
    fornecedor_id: int,
    fornecedor_in: Fornecedor,
    current_user: Usuario = Depends(get_current_user),
) -> Any:
    """
    Atualizar fornecedor.
    """
    fornecedor = db.get(Fornecedor, fornecedor_id)
    if not fornecedor:
        raise HTTPException(status_code=404, detail="Fornecedor não encontrado")
    
    # Verificar se o novo CNPJ já existe (se foi alterado)
    if fornecedor_in.cnpj != fornecedor.cnpj:
        existing = db.exec(select(Fornecedor).where(Fornecedor.cnpj == fornecedor_in.cnpj)).first()
        if existing:
            raise HTTPException(
                status_code=400,
                detail="Fornecedor com este CNPJ já existe no sistema."
            )
    
    fornecedor_data = fornecedor_in.dict(exclude_unset=True)
    for field in fornecedor_data:
        setattr(fornecedor, field, fornecedor_data[field])
    
    db.add(fornecedor)
    db.commit()
    db.refresh(fornecedor)
    return fornecedor

@router.delete("/{fornecedor_id}")
def delete_fornecedor(
    *,
    db: Session = Depends(get_db),
    fornecedor_id: int,
    current_user: Usuario = Depends(get_current_user),
) -> Any:
    """
    Deletar fornecedor.
    """
    fornecedor = db.get(Fornecedor, fornecedor_id)
    if not fornecedor:
        raise HTTPException(status_code=404, detail="Fornecedor não encontrado")
    
    # Soft delete
    fornecedor.active = False
    db.add(fornecedor)
    db.commit()
    return {"ok": True}

@router.get("/search/", response_model=List[Fornecedor])
def search_fornecedores(
    *,
    db: Session = Depends(get_db),
    query: str,
    current_user: Usuario = Depends(get_current_user),
) -> Any:
    """
    Pesquisar fornecedores por nome, CNPJ ou email.
    """
    fornecedores = db.exec(
        select(Fornecedor).where(
            (Fornecedor.nome.contains(query)) |
            (Fornecedor.cnpj.contains(query)) |
            (Fornecedor.email.contains(query))
        )
    ).all()
    return fornecedores

@router.get("/categoria/{categoria}", response_model=List[Fornecedor])
def get_fornecedores_by_categoria(
    *,
    db: Session = Depends(get_db),
    categoria: str,
    current_user: Usuario = Depends(get_current_user),
) -> Any:
    """
    Obter fornecedores por categoria.
    """
    fornecedores = db.exec(
        select(Fornecedor).where(Fornecedor.categoria == categoria)
    ).all()
    return fornecedores 