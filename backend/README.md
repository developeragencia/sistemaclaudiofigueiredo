# Sistema Claudio Figueiredo - Backend

Sistema de gestão de pagamentos com controle de retenções.

## Tecnologias

- FastAPI
- SQLModel
- PostgreSQL
- Redis
- Celery
- Docker

## Requisitos

- Python 3.11+
- Docker e Docker Compose
- PostgreSQL 15
- Redis 7

## Instalação

1. Clone o repositório:
```bash
git clone <repository_url>
cd backend
```

2. Crie um ambiente virtual e ative-o:
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate  # Windows
```

3. Instale as dependências:
```bash
pip install -r requirements.txt
```

4. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

5. Inicie os serviços com Docker:
```bash
docker-compose up -d
```

6. Execute as migrações:
```bash
alembic upgrade head
```

7. Inicie o servidor de desenvolvimento:
```bash
uvicorn app.main:app --reload
```

8. Em outro terminal, inicie o worker do Celery:
```bash
celery -A app.core.celery_app worker --loglevel=info
```

9. Em outro terminal, inicie o beat do Celery:
```bash
celery -A app.core.celery_app beat --loglevel=info
```

## Documentação da API

Após iniciar o servidor, acesse:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Estrutura do Projeto

```
backend/
├── alembic/              # Migrações do banco de dados
├── app/
│   ├── api/             # Endpoints da API
│   ├── core/            # Configurações centrais
│   ├── models/          # Modelos SQLModel
│   ├── schemas/         # Schemas Pydantic
│   ├── services/        # Lógica de negócios
│   └── tests/           # Testes
├── requirements.txt     # Dependências Python
└── README.md           # Este arquivo
```

## Desenvolvimento

### Criar nova migração

```bash
alembic revision --autogenerate -m "descrição da migração"
```

### Executar testes

```bash
pytest
```

### Formatar código

```bash
black app
isort app
```

## Endpoints Principais

### Autenticação
- POST /api/v1/auth/login
- POST /api/v1/auth/signup
- POST /api/v1/auth/2fa/enable

### Clientes
- GET /api/v1/clientes
- POST /api/v1/clientes
- GET /api/v1/clientes/{id}
- PUT /api/v1/clientes/{id}
- DELETE /api/v1/clientes/{id}

### Fornecedores
- GET /api/v1/fornecedores
- POST /api/v1/fornecedores
- GET /api/v1/fornecedores/{id}
- PUT /api/v1/fornecedores/{id}
- DELETE /api/v1/fornecedores/{id}

### Pagamentos
- GET /api/v1/pagamentos
- POST /api/v1/pagamentos
- GET /api/v1/pagamentos/{id}
- PUT /api/v1/pagamentos/{id}
- DELETE /api/v1/pagamentos/{id}
- GET /api/v1/pagamentos/vencimento/{data}
- GET /api/v1/pagamentos/status/{status}

## Segurança

- Autenticação JWT
- 2FA opcional para perfis críticos
- CORS configurável
- Rate limiting
- Validação de dados com Pydantic

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nome-da-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nome-da-feature`)
5. Crie um Pull Request 