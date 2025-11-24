from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.config.database import get_session
from app.models.client_model import Client
from app.models.service_order import ServiceRequest
from app import schemas

router = APIRouter()


@router.post("")
def create_client(payload: schemas.ClientCreate, db: Session = Depends(get_session)):
    if db.query(Client).filter(Client.email == payload.email).first():
        return {"ok": False, "error": "Login ja cadastrado."}
    if db.query(Client).filter(Client.cpf == payload.cpf).first():
        return {"ok": False, "error": "CPF ja cadastrado."}
    client = Client(
        email=payload.email,
        phone=payload.phone,
        password=payload.password,
        name=payload.name,
        cpf=payload.cpf,
        birth_date=payload.birth_date,
        marital_status=payload.marital_status,
        school_degree=payload.school_degree,
    )
    db.add(client)
    db.commit()
    return {"ok": True}


@router.get("")
def list_clients(db: Session = Depends(get_session)):
    clients = db.query(Client).order_by(Client.id).all()
    data = [
        {
            "id": c.id,
            "email": c.email,
            "phone": c.phone,
            "name": c.name,
            "cpf": c.cpf,
            "birth_date": c.birth_date,
            "marital_status": c.marital_status,
            "school_degree": c.school_degree,
        }
        for c in clients
    ]
    return {"ok": True, "data": data}


@router.post("/trocar-senha")
def change_password(payload: schemas.PasswordChange, db: Session = Depends(get_session)):
    client = db.query(Client).filter(Client.email == payload.login).first()
    if not client:
        return {"ok": False, "error": "Cliente nao encontrado."}
    if client.password != payload.old_password:
        return {"ok": False, "error": "Senha atual incorreta."}
    client.password = payload.new_password
    db.commit()
    return {"ok": True}


@router.delete("/{login}")
def delete_client(login: str, db: Session = Depends(get_session)):
    client = db.query(Client).filter(Client.email == login).first()
    if not client:
        return {"ok": False, "error": "Cliente nao encontrado."}
    db.query(ServiceRequest).filter(ServiceRequest.client_id == client.id).delete()
    db.delete(client)
    db.commit()
    return {"ok": True}
