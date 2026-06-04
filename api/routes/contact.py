from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from security import get_admin_user
from crud.crud import create_contact_message, get_contact_messages, update_message_responded
from schemas.schemas import ContactMessageCreate, ContactMessageResponse
from typing import List

router = APIRouter()

@router.post("", response_model=ContactMessageResponse, status_code=status.HTTP_201_CREATED)
def create_new_message(message: ContactMessageCreate, db: Session = Depends(get_db)):
    return create_contact_message(db, message)

@router.get("", response_model=List[ContactMessageResponse])
def list_messages(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), admin: dict = Depends(get_admin_user)):
    return get_contact_messages(db, skip, limit)

@router.patch("/{message_id}/respond")
def mark_responded(message_id: int, is_responded: bool, db: Session = Depends(get_db), admin: dict = Depends(get_admin_user)):
    db_message = update_message_responded(db, message_id, is_responded)
    if db_message is None:
        raise HTTPException(status_code=404, detail="Message not found")
    return db_message
