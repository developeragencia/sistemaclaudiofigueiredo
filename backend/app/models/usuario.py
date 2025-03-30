from typing import Optional
from sqlmodel import SQLModel, Field
from .base import BaseModel

class Usuario(BaseModel, table=True):
    __tablename__ = "usuarios"
    
    email: str = Field(unique=True, index=True)
    nome: str = Field(index=True)
    senha_hash: str
    is_active: bool = Field(default=True)
    is_superuser: bool = Field(default=False)
    two_factor_enabled: bool = Field(default=False)
    two_factor_secret: Optional[str] = None
    
    class Config:
        schema_extra = {
            "example": {
                "email": "admin@exemplo.com",
                "nome": "Administrador",
                "is_active": True,
                "is_superuser": False,
                "two_factor_enabled": False
            }
        } 