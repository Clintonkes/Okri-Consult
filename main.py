from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import logging
from config import settings
from database import Base, engine
from api.routes import bookings, quotes, testimonials, services, contact, auth

app = FastAPI(title=settings.PROJECT_NAME)
logger = logging.getLogger(__name__)
frontend_dist = Path(__file__).resolve().parent / "frontend" / "dist"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["auth"])
app.include_router(bookings.router, prefix=f"{settings.API_V1_STR}/bookings", tags=["bookings"])
app.include_router(quotes.router, prefix=f"{settings.API_V1_STR}/quotes", tags=["quotes"])
app.include_router(testimonials.router, prefix=f"{settings.API_V1_STR}/testimonials", tags=["testimonials"])
app.include_router(services.router, prefix=f"{settings.API_V1_STR}/services", tags=["services"])
app.include_router(contact.router, prefix=f"{settings.API_V1_STR}/contact", tags=["contact"])


@app.on_event("startup")
def startup_event():
    try:
        Base.metadata.create_all(bind=engine)
    except Exception:
        logger.exception("Database initialization failed during startup")

@app.get("/")
def root():
    return {"message": "Welcome to Okri Consult LLC API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}


if frontend_dist.exists():
    app.mount("/", StaticFiles(directory=frontend_dist, html=True), name="frontend")
else:
    logger.warning("Frontend build output not found at %s", frontend_dist)
