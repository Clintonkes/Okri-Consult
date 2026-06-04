from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from security import get_admin_user
from crud.crud import create_contact_message, get_contact_messages_paginated, get_contact_message, update_message_responded
from schemas.schemas import ContactMessageCreate, ContactMessageResponse
from typing import List
from services.email_service import send_admin_contact_notification, send_contact_ack_email

router = APIRouter()

@router.post("", response_model=ContactMessageResponse, status_code=status.HTTP_201_CREATED)
def create_new_message(message: ContactMessageCreate, db: Session = Depends(get_db)):
    db_message = create_contact_message(db, message)
    send_contact_ack_email(db_message.name, db_message.email, db_message.subject)
    send_admin_contact_notification(db_message.name, db_message.email, db_message.subject, db_message.message)
    return db_message

@router.get("")
def list_messages(page: int = 1, limit: int = 10, db: Session = Depends(get_db), admin: dict = Depends(get_admin_user)):
    return get_contact_messages_paginated(db, page, limit)

@router.get("/{message_id}", response_model=ContactMessageResponse)
def read_message(message_id: int, db: Session = Depends(get_db), admin: dict = Depends(get_admin_user)):
    db_message = get_contact_message(db, message_id)
    if db_message is None:
        raise HTTPException(status_code=404, detail="Message not found")
    if not db_message.is_responded:
        db_message.is_responded = True
        db.commit()
        db.refresh(db_message)
    return db_message

@router.patch("/{message_id}/respond")
def mark_responded(message_id: int, is_responded: bool, db: Session = Depends(get_db), admin: dict = Depends(get_admin_user)):
    db_message = update_message_responded(db, message_id, is_responded)
    if db_message is None:
        raise HTTPException(status_code=404, detail="Message not found")
    return db_message
