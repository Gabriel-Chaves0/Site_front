from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.config.database import get_session
from app.models.client_model import Client
from app import schemas

router = APIRouter()


@router.post("/auth")
def auth(payload: schemas.AuthRequest, db: Session = Depends(get_session)):
    client = db.query(Client).filter(Client.email == payload.login).first()
    if not client or client.password != payload.password:
        return {"ok": False, "error": "Login ou senha invalidos."}
    return {"ok": True, "data": {"login": client.email, "name": client.name}}
