from celery import Celery
from .config import settings

celery_app = Celery(
    "worker",
    broker=f"redis://{settings.REDIS_HOST}:{settings.REDIS_PORT}/0",
    include=["app.services.pagamento"]
)

# Configurações opcionais
celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="America/Sao_Paulo",
    enable_utc=True,
)

# Configurar tarefas periódicas
celery_app.conf.beat_schedule = {
    'verificar-pagamentos-vencidos': {
        'task': 'app.services.pagamento.verificar_pagamentos_vencidos',
        'schedule': 3600.0,  # Executa a cada hora
    },
} 