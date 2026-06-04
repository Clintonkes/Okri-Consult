from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from database import get_db
from security import get_admin_user
from crud.crud import create_booking, get_bookings, get_booking, update_booking_status, delete_booking
from schemas.schemas import BookingCreate, BookingResponse
from typing import List

router = APIRouter()

@router.post("", response_model=BookingResponse, status_code=status.HTTP_201_CREATED)
def create_new_booking(booking: BookingCreate, db: Session = Depends(get_db)):
    return create_booking(db, booking)

@router.get("", response_model=List[BookingResponse])
def list_bookings(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), admin = Depends(get_admin_user)):
    return get_bookings(db, skip, limit)

@router.get("/{booking_id}", response_model=BookingResponse)
def read_booking(booking_id: int, db: Session = Depends(get_db), admin = Depends(get_admin_user)):
    db_booking = get_booking(db, booking_id)
    if db_booking is None:
        raise HTTPException(status_code=404, detail="Booking not found")
    return db_booking

@router.patch("/{booking_id}/status")
def update_status(booking_id: int, status: str = Query(...), db: Session = Depends(get_db), admin = Depends(get_admin_user)):
    db_booking = update_booking_status(db, booking_id, status)
    if db_booking is None:
        raise HTTPException(status_code=404, detail="Booking not found")
    return db_booking

@router.delete("/{booking_id}")
def delete_booking_endpoint(booking_id: int, db: Session = Depends(get_db), admin = Depends(get_admin_user)):
    db_booking = delete_booking(db, booking_id)
    if db_booking is None:
        raise HTTPException(status_code=404, detail="Booking not found")
    return {"message": "Booking deleted"}
