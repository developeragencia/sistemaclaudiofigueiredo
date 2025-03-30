from typing import Generator, Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from sqlmodel import Session
from .database import get_session
from .config import settings
from .security import verify_2fa_code
from ..models.usuario import Usuario
from ..schemas.auth import TokenPayload

oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/auth/login")

def get_db() -> Generator:
    try:
        db = next(get_session())
        yield db
    finally:
        db.close()

async def get_current_user(
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
) -> Usuario:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Não foi possível validar as credenciais",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=["HS256"]
        )
        token_data = TokenPayload(**payload)
    except JWTError:
        raise credentials_exception
    
    user = db.get(Usuario, token_data.sub)
    if not user:
        raise credentials_exception
    if not user.is_active:
        raise HTTPException(status_code=400, detail="Usuário inativo")
    return user

def get_current_active_superuser(
    current_user: Usuario = Depends(get_current_user),
) -> Usuario:
    if not current_user.is_superuser:
        raise HTTPException(
            status_code=400, detail="O usuário não tem privilégios suficientes"
        )
    return current_user

async def verify_2fa(
    user: Usuario,
    code: str,
) -> bool:
    if not user.two_factor_enabled:
        return True
    if not user.two_factor_secret:
        raise HTTPException(
            status_code=400,
            detail="2FA está habilitado mas não configurado corretamente"
        )
    return verify_2fa_code(user.two_factor_secret, code) 