from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.config import settings
from .core.database import init_db
from .api.v1.api import api_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Configurar CORS
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Incluir rotas da API
app.include_router(api_router, prefix=settings.API_V1_STR)

# Inicializar banco de dados
@app.on_event("startup")
async def on_startup():
    init_db()

# Rota de teste
@app.get("/")
async def root():
    return {
        "message": "Sistema Claudio Figueiredo API",
        "docs_url": "/docs",
        "redoc_url": "/redoc"
    } 