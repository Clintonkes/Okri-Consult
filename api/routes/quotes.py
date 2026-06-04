from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from security import get_admin_user
from crud.crud import create_quote_request, get_quote_requests
from schemas.schemas import QuoteRequestCreate, QuoteRequestResponse
from typing import List

router = APIRouter()

@router.post("", response_model=QuoteRequestResponse, status_code=status.HTTP_201_CREATED)
def create_new_quote(quote: QuoteRequestCreate, db: Session = Depends(get_db)):
    return create_quote_request(db, quote)

@router.get("", response_model=List[QuoteRequestResponse])
def list_quotes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), admin: dict = Depends(get_admin_user)):
    return get_quote_requests(db, skip, limit)
