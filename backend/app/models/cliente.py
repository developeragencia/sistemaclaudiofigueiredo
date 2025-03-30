from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship
from .base import BaseModel

class Cliente(BaseModel, table=True):
    __tablename__ = "clientes"
    
    nome: str = Field(index=True)
    cnpj: str = Field(unique=True, index=True)
    email: str = Field(index=True)
    telefone: Optional[str] = None
    endereco: Optional[str] = None
    cidade: Optional[str] = None
    estado: Optional[str] = None
    cep: Optional[str] = None
    
    # Campos específicos para retenção
    regime_tributario: Optional[str] = None
    percentual_retencao: Optional[float] = Field(default=0.0)
    
    # Relacionamentos
    pagamentos: List["Pagamento"] = Relationship(back_populates="cliente")
    
    class Config:
        schema_extra = {
            "example": {
                "nome": "Empresa XYZ Ltda",
                "cnpj": "12.345.678/0001-90",
                "email": "contato@xyz.com",
                "telefone": "(11) 1234-5678",
                "regime_tributario": "SIMPLES",
                "percentual_retencao": 0.0
            }
        } 