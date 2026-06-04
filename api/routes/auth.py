from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from security import get_admin_user, create_access_token
from schemas.schemas import AdminLogin, Token
from crud.crud import authenticate_admin as verify_admin
from config import settings

router = APIRouter()

@router.post("/login", response_model=Token)
def login(form_data: AdminLogin, db: Session = Depends(get_db)):
    admin = verify_admin(db, form_data.email, form_data.password)
    if not admin:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": admin.email})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/logout")
def logout(admin = Depends(get_admin_user)):
    return {"message": "Successfully logged out"}

@router.get("/me")
def read_admin_me(admin = Depends(get_admin_user)):
    return {"email": admin.email, "is_superuser": admin.is_superuser}