from sqlalchemy import Column, String, Integer, Date
from app.config.base import Base


class Client(Base):
    __tablename__ = "client"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    email = Column(String, nullable=False, unique=True, index=True)
    phone = Column(String, nullable=True)
    password = Column(String, nullable=False)
    name = Column(String, nullable=False)
    cpf = Column(String, unique=True, nullable=False)
    birth_date = Column(Date, nullable=False)
    marital_status = Column(String, nullable=True)
    school_degree = Column(String, nullable=False)
