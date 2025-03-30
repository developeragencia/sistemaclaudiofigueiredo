from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship
from .base import BaseModel

class Fornecedor(BaseModel, table=True):
    __tablename__ = "fornecedores"
    
    nome: str = Field(index=True)
    cnpj: str = Field(unique=True, index=True)
    email: str = Field(index=True)
    telefone: Optional[str] = None
    endereco: Optional[str] = None
    cidade: Optional[str] = None
    estado: Optional[str] = None
    cep: Optional[str] = None
    
    # Campos específicos para fornecedor
    categoria: Optional[str] = None
    banco: Optional[str] = None
    agencia: Optional[str] = None
    conta: Optional[str] = None
    pix: Optional[str] = None
    
    # Relacionamentos
    pagamentos: List["Pagamento"] = Relationship(back_populates="fornecedor")
    
    class Config:
        schema_extra = {
            "example": {
                "nome": "Fornecedor ABC Ltda",
                "cnpj": "98.765.432/0001-10",
                "email": "financeiro@abc.com",
                "telefone": "(11) 9876-5432",
                "categoria": "SERVIÇOS",
                "banco": "001",
                "agencia": "1234",
                "conta": "12345-6",
                "pix": "98765432000110"
            }
        } 