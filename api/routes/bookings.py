from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from database import get_db
from security import get_admin_user
from crud.crud import create_booking, get_bookings_paginated, get_booking, update_booking_status, delete_booking
from schemas.schemas import BookingCreate, BookingResponse
from typing import List
from services.email_service import (
    send_admin_booking_notification,
    send_booking_received_email,
    send_booking_status_update_email,
)

router = APIRouter()

@router.post("", response_model=BookingResponse, status_code=status.HTTP_201_CREATED)
def create_new_booking(booking: BookingCreate, db: Session = Depends(get_db)):
    db_booking = create_booking(db, booking)
    send_booking_received_email(db_booking.full_name, db_booking.email, db_booking.service_type, db_booking.status)
    send_admin_booking_notification(db_booking.full_name, db_booking.email, db_booking.service_type, db_booking.status)
    return db_booking

@router.get("")
def list_bookings(page: int = 1, limit: int = 10, db: Session = Depends(get_db), admin = Depends(get_admin_user)):
    return get_bookings_paginated(db, page, limit)

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
    send_booking_status_update_email(db_booking.full_name, db_booking.email, db_booking.service_type, db_booking.status)
    return db_booking

@router.delete("/{booking_id}")
def delete_booking_endpoint(booking_id: int, db: Session = Depends(get_db), admin = Depends(get_admin_user)):
    db_booking = delete_booking(db, booking_id)
    if db_booking is None:
        raise HTTPException(status_code=404, detail="Booking not found")
    return {"message": "Booking deleted"}
