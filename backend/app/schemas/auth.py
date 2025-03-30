from typing import Optional
from pydantic import BaseModel, EmailStr

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenPayload(BaseModel):
    sub: Optional[int] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class TwoFactorLogin(BaseModel):
    email: EmailStr
    code: str

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    nome: str

class UserUpdate(BaseModel):
    nome: Optional[str] = None
    password: Optional[str] = None
    is_active: Optional[bool] = None
    two_factor_enabled: Optional[bool] = None 