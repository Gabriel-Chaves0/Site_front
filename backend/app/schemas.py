from datetime import date
from typing import List, Optional
from pydantic import BaseModel, EmailStr, Field


class ClientCreate(BaseModel):
  email: EmailStr
  phone: Optional[str] = None
  password: str = Field(min_length=3)
  name: str
  cpf: str
  birth_date: date
  marital_status: Optional[str] = None
  school_degree: str


class ClientOut(BaseModel):
  id: int
  email: EmailStr
  phone: Optional[str] = None
  name: str
  cpf: str
  birth_date: date
  marital_status: Optional[str] = None
  school_degree: str

  class Config:
    from_attributes = True


class AuthRequest(BaseModel):
  login: EmailStr
  password: str


class PasswordChange(BaseModel):
  login: EmailStr
  old_password: str
  new_password: str


class ServiceCreate(BaseModel):
  name: str
  description: Optional[str] = None
  price: float
  deadline: int


class ServiceOut(BaseModel):
  id: int
  name: str
  description: Optional[str]
  price: float
  deadline: int

  class Config:
    from_attributes = True


class SolicitationItem(BaseModel):
  service_id: int
  status: Optional[str] = "EM ELABORAÇÃO"


class SolicitationUpdate(BaseModel):
  items: List[SolicitationItem]


class SolicitationOut(BaseModel):
  id: int
  service_id: int
  service_name: str
  status: str
  price: float
  created_at: date
  expected_date: date

  class Config:
    from_attributes = True
