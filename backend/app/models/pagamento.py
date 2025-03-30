from datetime import date
from typing import Optional
from decimal import Decimal
from sqlmodel import SQLModel, Field, Relationship
from .base import BaseModel

class Pagamento(BaseModel, table=True):
    __tablename__ = "pagamentos"
    
    # Relacionamentos
    cliente_id: Optional[int] = Field(default=None, foreign_key="clientes.id")
    fornecedor_id: int = Field(foreign_key="fornecedores.id")
    
    cliente: Optional["Cliente"] = Relationship(back_populates="pagamentos")
    fornecedor: "Fornecedor" = Relationship(back_populates="pagamentos")
    
    # Campos do pagamento
    numero_nota: str = Field(index=True)
    data_emissao: date
    data_vencimento: date
    valor_total: Decimal = Field(max_digits=10, decimal_places=2)
    valor_retencao: Decimal = Field(default=0, max_digits=10, decimal_places=2)
    valor_liquido: Decimal = Field(max_digits=10, decimal_places=2)
    
    # Status e controle
    status: str = Field(default="PENDENTE")  # PENDENTE, PROCESSANDO, PAGO, CANCELADO
    data_pagamento: Optional[date] = None
    observacoes: Optional[str] = None
    
    # Campos de auditoria
    processado_por: Optional[str] = None
    comprovante_url: Optional[str] = None
    
    class Config:
        schema_extra = {
            "example": {
                "numero_nota": "NF-123456",
                "data_emissao": "2024-03-30",
                "data_vencimento": "2024-04-30",
                "valor_total": 1000.00,
                "valor_retencao": 150.00,
                "valor_liquido": 850.00,
                "status": "PENDENTE",
                "observacoes": "Pagamento referente a serviços prestados"
            }
        } 