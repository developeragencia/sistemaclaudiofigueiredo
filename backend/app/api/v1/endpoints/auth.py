from datetime import timedelta
from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select
from ....core import security
from ....core.config import settings
from ....core.deps import get_db, get_current_user, verify_2fa
from ....models.usuario import Usuario
from ....schemas.auth import Token, UserCreate, UserLogin, TwoFactorLogin

router = APIRouter()

@router.post("/login", response_model=Token)
async def login(
    db: Session = Depends(get_db),
    form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    """
    Login OAuth2 com usuário e senha
    """
    user = db.exec(select(Usuario).where(Usuario.email == form_data.username)).first()
    if not user or not security.verify_password(form_data.password, user.senha_hash):
        raise HTTPException(
            status_code=400,
            detail="Email ou senha incorretos"
        )
    if not user.is_active:
        raise HTTPException(
            status_code=400,
            detail="Usuário inativo"
        )
    
    if user.two_factor_enabled:
        # Retorna um token temporário para 2FA
        access_token_expires = timedelta(minutes=5)
        token = security.create_access_token(
            user.id, expires_delta=access_token_expires
        )
        return {"access_token": token, "token_type": "bearer_2fa"}
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": security.create_access_token(
            user.id, expires_delta=access_token_expires
        ),
        "token_type": "bearer"
    }

@router.post("/login/2fa", response_model=Token)
async def verify_2fa_login(
    *,
    db: Session = Depends(get_db),
    two_factor_data: TwoFactorLogin
) -> Any:
    """
    Verificação do código 2FA
    """
    user = db.exec(select(Usuario).where(Usuario.email == two_factor_data.email)).first()
    if not user:
        raise HTTPException(
            status_code=404,
            detail="Usuário não encontrado"
        )
    
    if not await verify_2fa(user, two_factor_data.code):
        raise HTTPException(
            status_code=400,
            detail="Código 2FA inválido"
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": security.create_access_token(
            user.id, expires_delta=access_token_expires
        ),
        "token_type": "bearer"
    }

@router.post("/signup", response_model=Token)
async def create_user(
    *,
    db: Session = Depends(get_db),
    user_in: UserCreate
) -> Any:
    """
    Criar novo usuário
    """
    user = db.exec(select(Usuario).where(Usuario.email == user_in.email)).first()
    if user:
        raise HTTPException(
            status_code=400,
            detail="Email já registrado"
        )
    
    user = Usuario(
        email=user_in.email,
        nome=user_in.nome,
        senha_hash=security.get_password_hash(user_in.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": security.create_access_token(
            user.id, expires_delta=access_token_expires
        ),
        "token_type": "bearer"
    }

@router.post("/2fa/enable")
async def enable_2fa(
    current_user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Any:
    """
    Habilitar autenticação 2FA para o usuário
    """
    if current_user.two_factor_enabled:
        raise HTTPException(
            status_code=400,
            detail="2FA já está habilitado"
        )
    
    secret = security.generate_2fa_secret()
    current_user.two_factor_secret = secret
    current_user.two_factor_enabled = True
    db.add(current_user)
    db.commit()
    
    return {
        "secret": secret,
        "qr_code": security.get_2fa_qr_code(secret, current_user.email)
    } 