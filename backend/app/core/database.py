from sqlmodel import SQLModel, create_engine, Session
from .config import settings

engine = create_engine(
    str(settings.SQLALCHEMY_DATABASE_URI),
    echo=True,
    pool_pre_ping=True
)

def init_db() -> None:
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session 