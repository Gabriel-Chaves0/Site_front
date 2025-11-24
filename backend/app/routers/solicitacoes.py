from datetime import date, timedelta
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.config.database import get_session
from app.models.client_model import Client
from app.models.it_services import ITService
from app.models.service_order import ServiceRequest
from app import schemas

router = APIRouter()


def get_client(login: str, db: Session):
    return db.query(Client).filter(Client.email == login).first()


@router.get("/{login}")
def list_requests(login: str, db: Session = Depends(get_session)):
    client = get_client(login, db)
    if not client:
        return {"ok": False, "error": "Cliente nao encontrado."}
    data = build_requests_response(client.id, db)
    return {"ok": True, "data": data}


@router.put("/{login}")
def replace_requests(
    login: str, payload: schemas.SolicitationUpdate, db: Session = Depends(get_session)
):
    client = get_client(login, db)
    if not client:
        return {"ok": False, "error": "Cliente nao encontrado."}

    db.query(ServiceRequest).filter(ServiceRequest.client_id == client.id).delete()

    today = date.today()
    for item in payload.items:
        svc = db.query(ITService).filter(ITService.id == item.service_id).first()
        if not svc:
            return {"ok": False, "error": f"Servico {item.service_id} nao encontrado."}
        req = ServiceRequest(
            client_id=client.id,
            service_id=svc.id,
            status=item.status or "EM ELABORACAO",
            created_at=today,
            expected_date=today + timedelta(days=svc.deadline),
            price=svc.price,
        )
        db.add(req)
    db.commit()
    data = build_requests_response(client.id, db)
    return {"ok": True, "data": data}


def build_requests_response(client_id: int, db: Session):
    rows = (
        db.query(ServiceRequest, ITService)
        .join(ITService, ServiceRequest.service_id == ITService.id)
        .filter(ServiceRequest.client_id == client_id)
        .order_by(ServiceRequest.created_at)
        .all()
    )
    return [
        {
            "id": r.id,
            "service_id": r.service_id,
            "service_name": svc.name,
            "status": r.status,
            "price": float(r.price),
            "created_at": r.created_at,
            "expected_date": r.expected_date,
        }
        for r, svc in rows
    ]
