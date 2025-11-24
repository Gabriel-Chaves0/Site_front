from sqlalchemy import Column, String, Integer, Date, Enum

from app.config.base import Base
from app.enums.marital_status_enum import MaritalStatusEnum
from app.enums.school_degree import SchoolDegreeEnum


# Email
# Celular
# Senha
# Nome Completo
# CPF
# Data de nascimento
# Estado civil (solteiro, casado, divorciado, Viuvo)
# Escolaridade

class Client(Base):
    __tablename__ = "client"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    email = Column(String, nullable=False, unique=True)
    phone = Column(String, nullable=True)
    password = Column(String, nullable=False)
    name = Column(String, nullable=False)
    cpf = Column(String, unique=True, nullable=False)
    birth_date = Column(Date, nullable=False)
    marital_status = Column(Enum(MaritalStatusEnum), nullable=True)
    school_degree = Column(Enum(SchoolDegreeEnum) , nullable=False)