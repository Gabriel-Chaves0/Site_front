from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from app.settings import Settings

DATABASE_URL = Settings.DATABASE_URL

engine = create_async_engine(DATABASE_URL, echo=Settings.DEVELOPING)
async_session = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)

# Database session dependency
async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session() as session:
        yield session