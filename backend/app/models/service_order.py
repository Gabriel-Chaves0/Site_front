from sqlalchemy import Column, String, Integer, Date, ForeignKey, Numeric
from app.config.base import Base


class ServiceRequest(Base):
    __tablename__ = "service_request"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    client_id = Column(Integer, ForeignKey("client.id"), nullable=False)
    service_id = Column(Integer, ForeignKey("it_service.id"), nullable=False)
    status = Column(String, nullable=False, default="EM ELABORAÇÃO")
    created_at = Column(Date, nullable=False)
    expected_date = Column(Date, nullable=False)
    price = Column(Numeric(10, 2), nullable=False)
