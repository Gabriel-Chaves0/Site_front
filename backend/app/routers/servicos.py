from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.config.database import get_session
from app.models.it_services import ITService
from app import schemas

router = APIRouter()


@router.post("")
def create_service(payload: schemas.ServiceCreate, db: Session = Depends(get_session)):
    existing = db.query(ITService).filter(ITService.name.ilike(payload.name)).first()
    if existing:
        return {"ok": False, "error": "Servico ja existe."}
    svc = ITService(
        name=payload.name,
        description=payload.description,
        price=payload.price,
        deadline=payload.deadline,
    )
    db.add(svc)
    db.commit()
    db.refresh(svc)
    return {
        "ok": True,
        "data": {
            "id": svc.id,
            "name": svc.name,
            "description": svc.description,
            "price": float(svc.price),
            "deadline": svc.deadline,
        },
    }


@router.get("")
def list_services(db: Session = Depends(get_session)):
    services = db.query(ITService).order_by(ITService.id).all()
    data = [
        {
            "id": s.id,
            "name": s.name,
            "description": s.description,
            "price": float(s.price),
            "deadline": s.deadline,
        }
        for s in services
    ]
    return {"ok": True, "data": data}
