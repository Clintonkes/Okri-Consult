from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from core.database import get_db
from core.security import get_admin_user
from crud.crud import create_service, get_services, get_service, update_service, delete_service
from schemas.schemas import ServiceCreate, ServiceResponse
from typing import List

router = APIRouter()

@router.post("/services", response_model=ServiceResponse, status_code=status.HTTP_201_CREATED)
def create_new_service(service: ServiceCreate, db: Session = Depends(get_db), admin: dict = Depends(get_admin_user)):
    return create_service(db, service)

@router.get("/services", response_model=List[ServiceResponse])
def list_services(active_only: bool = True, db: Session = Depends(get_db)):
    return get_services(db, active_only)

@router.get("/services/{service_id}", response_model=ServiceResponse)
def read_service(service_id: int, db: Session = Depends(get_db)):
    db_service = get_service(db, service_id)
    if db_service is None:
        raise HTTPException(status_code=404, detail="Service not found")
    return db_service

@router.put("/services/{service_id}", response_model=ServiceResponse)
def update_service_endpoint(service_id: int, service: ServiceCreate, db: Session = Depends(get_db), admin: dict = Depends(get_admin_user)):
    db_service = update_service(db, service_id, service)
    if db_service is None:
        raise HTTPException(status_code=404, detail="Service not found")
    return db_service

@router.delete("/services/{service_id}")
def delete_service_endpoint(service_id: int, db: Session = Depends(get_db), admin: dict = Depends(get_admin_user)):
    db_service = delete_service(db, service_id)
    if db_service is None:
        raise HTTPException(status_code=404, detail="Service not found")
    return {"message": "Service deleted"}