from datetime import datetime, timedelta
from typing import Any, Union, Optional
from jose import jwt
from passlib.context import CryptContext
from .config import settings
import pyotp

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_access_token(subject: Union[str, Any], expires_delta: timedelta = None) -> str:
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode = {"exp": expire, "sub": str(subject)}
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm="HS256")
    return encoded_jwt

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def generate_2fa_secret() -> str:
    """Gera um segredo para autenticação 2FA"""
    return pyotp.random_base32()

def verify_2fa_code(secret: str, code: str) -> bool:
    """Verifica se o código 2FA é válido"""
    totp = pyotp.TOTP(secret)
    return totp.verify(code)

def get_2fa_qr_code(secret: str, email: str) -> str:
    """Gera a URL do QR code para configuração do 2FA"""
    totp = pyotp.TOTP(secret)
    return totp.provisioning_uri(email, issuer_name=settings.PROJECT_NAME) 