from sqlalchemy import Column, String, Integer, Numeric

from app.config.base import Base

class ITService(Base):
    __tablename__ = "it_service"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, nullable=False)
    price = Column(Numeric(10,2), nullable=False)
    deadline = Column(Integer, nullable=False) # Em dias
    