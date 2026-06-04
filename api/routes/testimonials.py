from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from security import get_admin_user, create_access_token
from crud.crud import create_testimonial, get_testimonials_paginated, get_testimonial, update_testimonial_publish, delete_testimonial
from schemas.schemas import TestimonialCreate, TestimonialResponse
from typing import List

router = APIRouter()

@router.post("", response_model=TestimonialResponse, status_code=status.HTTP_201_CREATED)
def create_new_testimonial(testimonial: TestimonialCreate, db: Session = Depends(get_db), admin: dict = Depends(get_admin_user)):
    return create_testimonial(db, testimonial)

@router.get("")
def list_testimonials(page: int = 1, limit: int = 10, published_only: bool = True, db: Session = Depends(get_db), admin: dict = Depends(get_admin_user)):
    return get_testimonials_paginated(db, published_only, page, limit)

@router.patch("/{testimonial_id}/publish")
def toggle_publish(testimonial_id: int, is_published: bool, db: Session = Depends(get_db), admin: dict = Depends(get_admin_user)):
    db_testimonial = update_testimonial_publish(db, testimonial_id, is_published)
    if db_testimonial is None:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    return db_testimonial

@router.delete("/{testimonial_id}")
def delete_testimonial_endpoint(testimonial_id: int, db: Session = Depends(get_db), admin: dict = Depends(get_admin_user)):
    db_testimonial = delete_testimonial(db, testimonial_id)
    if db_testimonial is None:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    return {"message": "Testimonial deleted"}
