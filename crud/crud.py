from sqlalchemy.orm import Session
from models.models import Booking, QuoteRequest, Testimonial, Service, ContactMessage, Admin, SiteSetting
from schemas.schemas import BookingCreate, QuoteRequestCreate, TestimonialCreate, ServiceCreate, ContactMessageCreate, AdminLogin
from database import hash_password, verify_password
from datetime import datetime

def create_booking(db: Session, booking: BookingCreate):
    db_booking = Booking(**booking.model_dump())
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking

def get_bookings(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Booking).order_by(Booking.created_at.desc()).offset(skip).limit(limit).all()

def get_bookings_paginated(db: Session, page: int = 1, limit: int = 10):
    total = db.query(Booking).count()
    offset = max(page - 1, 0) * limit
    items = db.query(Booking).order_by(Booking.created_at.desc()).offset(offset).limit(limit).all()
    return {
        "items": items,
        "total": total,
        "page": page,
        "limit": limit,
        "total_pages": max((total + limit - 1) // limit, 1) if total else 1,
    }

def get_booking(db: Session, booking_id: int):
    return db.query(Booking).filter(Booking.id == booking_id).first()

def update_booking_status(db: Session, booking_id: int, status: str):
    db_booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if db_booking:
        db_booking.status = status
        db.commit()
        db.refresh(db_booking)
    return db_booking

def delete_booking(db: Session, booking_id: int):
    db_booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if db_booking:
        db.delete(db_booking)
        db.commit()
    return db_booking

def create_quote_request(db: Session, quote: QuoteRequestCreate):
    db_quote = QuoteRequest(**quote.model_dump())
    db.add(db_quote)
    db.commit()
    db.refresh(db_quote)
    return db_quote

def get_quote_requests(db: Session, skip: int = 0, limit: int = 100):
    return db.query(QuoteRequest).order_by(QuoteRequest.created_at.desc()).offset(skip).limit(limit).all()

def get_quote_requests_paginated(db: Session, page: int = 1, limit: int = 10):
    total = db.query(QuoteRequest).count()
    offset = max(page - 1, 0) * limit
    items = db.query(QuoteRequest).order_by(QuoteRequest.created_at.desc()).offset(offset).limit(limit).all()
    return {
        "items": items,
        "total": total,
        "page": page,
        "limit": limit,
        "total_pages": max((total + limit - 1) // limit, 1) if total else 1,
    }

def create_testimonial(db: Session, testimonial: TestimonialCreate):
    db_testimonial = Testimonial(**testimonial.model_dump())
    db.add(db_testimonial)
    db.commit()
    db.refresh(db_testimonial)
    return db_testimonial

def get_testimonials(db: Session, published_only: bool = True, skip: int = 0, limit: int = 100):
    query = db.query(Testimonial)
    if published_only:
        query = query.filter(Testimonial.is_published == True)
    return query.order_by(Testimonial.created_at.desc()).offset(skip).limit(limit).all()

def get_testimonials_paginated(db: Session, published_only: bool = True, page: int = 1, limit: int = 10):
    query = db.query(Testimonial)
    if published_only:
        query = query.filter(Testimonial.is_published == True)
    total = query.count()
    offset = max(page - 1, 0) * limit
    items = query.order_by(Testimonial.created_at.desc()).offset(offset).limit(limit).all()
    return {
        "items": items,
        "total": total,
        "page": page,
        "limit": limit,
        "total_pages": max((total + limit - 1) // limit, 1) if total else 1,
    }

def get_testimonial(db: Session, testimonial_id: int):
    return db.query(Testimonial).filter(Testimonial.id == testimonial_id).first()

def update_testimonial_publish(db: Session, testimonial_id: int, is_published: bool):
    db_testimonial = db.query(Testimonial).filter(Testimonial.id == testimonial_id).first()
    if db_testimonial:
        db_testimonial.is_published = is_published
        db.commit()
        db.refresh(db_testimonial)
    return db_testimonial

def delete_testimonial(db: Session, testimonial_id: int):
    db_testimonial = db.query(Testimonial).filter(Testimonial.id == testimonial_id).first()
    if db_testimonial:
        db.delete(db_testimonial)
        db.commit()
    return db_testimonial

def create_service(db: Session, service: ServiceCreate):
    db_service = Service(**service.model_dump())
    db.add(db_service)
    db.commit()
    db.refresh(db_service)
    return db_service

def get_services(db: Session, active_only: bool = True):
    query = db.query(Service)
    if active_only:
        query = query.filter(Service.is_active == True)
    return query.order_by(Service.created_at.desc()).all()

def get_service(db: Session, service_id: int):
    return db.query(Service).filter(Service.id == service_id).first()

def update_service(db: Session, service_id: int, service: ServiceCreate):
    db_service = db.query(Service).filter(Service.id == service_id).first()
    if db_service:
        db_service.title = service.title
        db_service.description = service.description
        db_service.icon = service.icon
        db.commit()
        db.refresh(db_service)
    return db_service

def delete_service(db: Session, service_id: int):
    db_service = db.query(Service).filter(Service.id == service_id).first()
    if db_service:
        db.delete(db_service)
        db.commit()
    return db_service

def create_contact_message(db: Session, message: ContactMessageCreate):
    db_message = ContactMessage(**message.model_dump())
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message

def get_contact_messages(db: Session, skip: int = 0, limit: int = 100):
    return db.query(ContactMessage).order_by(ContactMessage.created_at.desc()).offset(skip).limit(limit).all()

def get_contact_messages_paginated(db: Session, page: int = 1, limit: int = 10):
    total = db.query(ContactMessage).count()
    offset = max(page - 1, 0) * limit
    items = db.query(ContactMessage).order_by(ContactMessage.created_at.desc()).offset(offset).limit(limit).all()
    return {
        "items": items,
        "total": total,
        "page": page,
        "limit": limit,
        "total_pages": max((total + limit - 1) // limit, 1) if total else 1,
    }

def get_contact_message(db: Session, message_id: int):
    return db.query(ContactMessage).filter(ContactMessage.id == message_id).first()

def update_message_responded(db: Session, message_id: int, is_responded: bool):
    db_message = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    if db_message:
        db_message.is_responded = is_responded
        db.commit()
        db.refresh(db_message)
    return db_message

def get_admin_by_email(db: Session, email: str):
    return db.query(Admin).filter(Admin.email == email).first()

def create_admin(db: Session, email: str, password: str, is_superuser: bool = False):
    hashed = hash_password(password)
    db_admin = Admin(email=email, password=hashed, is_superuser=is_superuser)
    db.add(db_admin)
    db.commit()
    db.refresh(db_admin)
    return db_admin

def authenticate_admin(db: Session, email: str, password: str):
    admin = get_admin_by_email(db, email)
    if not admin:
        return None
    if verify_password(password, admin.password):
        return admin
    return None

def get_setting(db: Session, key: str):
    return db.query(SiteSetting).filter(SiteSetting.key == key).first()

def get_all_settings(db: Session):
    return db.query(SiteSetting).all()
