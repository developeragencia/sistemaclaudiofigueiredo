from fastapi.testclient import TestClient
from sqlmodel import Session, SQLModel, create_engine
from sqlmodel.pool import StaticPool
import pytest
from ..main import app
from ..core.deps import get_db
from ..models.usuario import Usuario
from ..core.security import get_password_hash

# Criar banco de dados em memória para testes
SQLALCHEMY_DATABASE_URL = "sqlite://"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)

def override_get_db():
    try:
        db = Session(engine)
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

@pytest.fixture
def client():
    SQLModel.metadata.create_all(engine)
    with TestClient(app) as c:
        yield c
    SQLModel.metadata.drop_all(engine)

@pytest.fixture
def db():
    db = Session(engine)
    try:
        yield db
    finally:
        db.close()

@pytest.fixture
def usuario_teste(db: Session):
    usuario = Usuario(
        email="teste@exemplo.com",
        nome="Usuário Teste",
        senha_hash=get_password_hash("senha123"),
        is_active=True
    )
    db.add(usuario)
    db.commit()
    db.refresh(usuario)
    return usuario

def test_read_main(client: TestClient):
    response = client.get("/")
    assert response.status_code == 200
    assert "message" in response.json()

def test_create_user(client: TestClient):
    response = client.post(
        "/api/v1/auth/signup",
        json={
            "email": "novo@exemplo.com",
            "password": "senha123",
            "nome": "Novo Usuário"
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

def test_login_user(client: TestClient, usuario_teste: Usuario):
    response = client.post(
        "/api/v1/auth/login",
        data={
            "username": usuario_teste.email,
            "password": "senha123"
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

def test_login_user_wrong_password(client: TestClient, usuario_teste: Usuario):
    response = client.post(
        "/api/v1/auth/login",
        data={
            "username": usuario_teste.email,
            "password": "senha_errada"
        }
    )
    assert response.status_code == 400

def test_read_users_me(client: TestClient, usuario_teste: Usuario):
    # Primeiro fazer login
    login_response = client.post(
        "/api/v1/auth/login",
        data={
            "username": usuario_teste.email,
            "password": "senha123"
        }
    )
    token = login_response.json()["access_token"]
    
    # Tentar acessar um endpoint protegido
    response = client.get(
        "/api/v1/clientes",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 200 