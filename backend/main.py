from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.settings import Settings
from app.config.database import init_db
from app.routers import auth, clientes, servicos, solicitacoes
from app.models.it_services import ITService
from app.config.database import SessionLocal


app = FastAPI(title="NovaTI API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[Settings.FRONTEND_ORIGIN, "http://localhost:5173", "http://localhost:4173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, tags=["auth"])
app.include_router(clientes.router, prefix="/clientes", tags=["clientes"])
app.include_router(servicos.router, prefix="/servicos", tags=["servicos"])
app.include_router(solicitacoes.router, prefix="/solicitacoes", tags=["solicitacoes"])


@app.on_event("startup")
def on_startup():
    init_db()
    seed_services()


def seed_services():
    session = SessionLocal()
    try:
        has_services = session.query(ITService).first()
        if has_services:
            return
        defaults = [
            {"name": "Site institucional", "price": 4500, "deadline": 7},
            {"name": "Migracao para Cloud", "price": 6900, "deadline": 10},
            {"name": "Dashboard de dados", "price": 7900, "deadline": 12},
            {"name": "Hardening de Seguranca", "price": 5200, "deadline": 8},
        ]
        for d in defaults:
            svc = ITService(
                name=d["name"],
                description=d["name"],
                price=d["price"],
                deadline=d["deadline"],
            )
            session.add(svc)
        session.commit()
    finally:
        session.close()
