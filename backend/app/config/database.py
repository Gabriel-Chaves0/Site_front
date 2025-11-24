from typing import Generator
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.settings import Settings
from app.config.base import Base

DATABASE_URL = Settings.DATABASE_URL

engine = create_engine(
    DATABASE_URL,
    echo=Settings.DEVELOPING,
    connect_args={"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {},
)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)


def init_db():
    Base.metadata.create_all(bind=engine)


def get_session() -> Generator:
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()
