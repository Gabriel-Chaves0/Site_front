from sqlalchemy import Column, String, Integer, Date, ForeignKey

from app.config.base import Base

class ServiceOrder(Base):
    __tablename__ = "service_order"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    client_id = Column(Integer, ForeignKey("client.id"), nullable=False)
    service_id = Column(Integer, ForeignKey("it_service.id"), nullable=False)