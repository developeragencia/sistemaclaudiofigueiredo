from fastapi import APIRouter
from .endpoints import auth, clientes, fornecedores, pagamentos

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(clientes.router, prefix="/clientes", tags=["clientes"])
api_router.include_router(fornecedores.router, prefix="/fornecedores", tags=["fornecedores"])
api_router.include_router(pagamentos.router, prefix="/pagamentos", tags=["pagamentos"]) 