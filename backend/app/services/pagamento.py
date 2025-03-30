from decimal import Decimal
from typing import Optional
from celery import Celery
from sqlmodel import Session, select
from ..core.config import settings
from ..models.pagamento import Pagamento

celery = Celery(
    "pagamentos",
    broker=f"redis://{settings.REDIS_HOST}:{settings.REDIS_PORT}/0"
)

def calcular_retencao(valor_total: Decimal, percentual_retencao: float) -> Decimal:
    """
    Calcula o valor da retenção baseado no percentual definido.
    """
    return Decimal(str(float(valor_total) * (percentual_retencao / 100)))

@celery.task
def processar_pagamento(pagamento_id: int) -> None:
    """
    Processa o pagamento de forma assíncrona.
    
    Este é um exemplo simplificado. Em produção, você deve:
    1. Integrar com um gateway de pagamento
    2. Implementar retry em caso de falhas
    3. Notificar os interessados sobre o status
    4. Gerar comprovantes
    5. Registrar logs detalhados
    """
    from ..core.database import get_session
    
    db = next(get_session())
    try:
        pagamento = db.get(Pagamento, pagamento_id)
        if not pagamento:
            raise ValueError(f"Pagamento {pagamento_id} não encontrado")
        
        # Atualiza status para processando
        pagamento.status = "PROCESSANDO"
        db.add(pagamento)
        db.commit()
        
        # Aqui você implementaria a integração com o gateway de pagamento
        # Por enquanto, vamos apenas simular um processamento bem-sucedido
        import time
        time.sleep(2)  # Simula processamento
        
        # Atualiza para pago
        pagamento.status = "PAGO"
        db.add(pagamento)
        db.commit()
        
    except Exception as e:
        # Em caso de erro, marca como pendente novamente
        pagamento = db.get(Pagamento, pagamento_id)
        if pagamento:
            pagamento.status = "PENDENTE"
            pagamento.observacoes = f"Erro no processamento: {str(e)}"
            db.add(pagamento)
            db.commit()
        raise
    finally:
        db.close()

@celery.task
def verificar_pagamentos_vencidos() -> None:
    """
    Tarefa periódica para verificar pagamentos vencidos.
    """
    from ..core.database import get_session
    from datetime import date
    
    db = next(get_session())
    try:
        hoje = date.today()
        pagamentos_vencidos = db.exec(
            select(Pagamento).where(
                (Pagamento.status == "PENDENTE") &
                (Pagamento.data_vencimento < hoje)
            )
        ).all()
        
        for pagamento in pagamentos_vencidos:
            pagamento.observacoes = f"Pagamento vencido em {pagamento.data_vencimento}"
            db.add(pagamento)
        
        db.commit()
    finally:
        db.close()

# Configuração das tarefas periódicas
celery.conf.beat_schedule = {
    'verificar-pagamentos-vencidos': {
        'task': 'app.services.pagamento.verificar_pagamentos_vencidos',
        'schedule': 3600.0,  # Executa a cada hora
    },
} 