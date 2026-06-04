from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class BookingCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    service_type: str
    preferred_date: str
    preferred_time: str
    address: str
    special_instructions: Optional[str] = None

class BookingResponse(BookingCreate):
    id: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class QuoteRequestCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    service_type: str
    property_size: Optional[str] = None
    address: str
    special_instructions: Optional[str] = None

class QuoteRequestResponse(QuoteRequestCreate):
    id: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class TestimonialCreate(BaseModel):
    name: str
    content: str
    rating: int = 5

class TestimonialResponse(TestimonialCreate):
    id: int
    is_published: bool
    created_at: datetime

    class Config:
        from_attributes = True

class ServiceCreate(BaseModel):
    title: str
    description: str
    icon: Optional[str] = None

class ServiceResponse(ServiceCreate):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: str
    message: str

class ContactMessageResponse(ContactMessageCreate):
    id: int
    is_responded: bool
    created_at: datetime

    class Config:
        from_attributes = True

class AdminLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class SiteSettingCreate(BaseModel):
    key: str
    value: str

class SiteSettingResponse(SiteSettingCreate):
    id: int
    updated_at: datetime

    class Config:
        from_attributes = True