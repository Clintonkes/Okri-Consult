from pathlib import Path

from fastapi import FastAPI
from fastapi import HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import logging
from config import settings
from database import Base, engine, SessionLocal
from crud.crud import get_admin_by_email, create_admin
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
        db = SessionLocal()
        try:
            admin = get_admin_by_email(db, settings.ADMIN_EMAIL)
            has_real_credentials = settings.ADMIN_EMAIL and settings.ADMIN_PASSWORD and settings.ADMIN_PASSWORD not in {
                "change-this-password",
                "change-this-password-securely",
            }
            if admin is None and has_real_credentials:
                create_admin(db, settings.ADMIN_EMAIL, settings.ADMIN_PASSWORD, is_superuser=True)
                logger.info("Seeded admin account for %s", settings.ADMIN_EMAIL)
        finally:
            db.close()
    except Exception:
        logger.exception("Database initialization failed during startup")

@app.get("/health")
def health_check():
    return {"status": "healthy"}


if frontend_dist.exists():
    assets_dir = frontend_dist / "assets"
    if assets_dir.exists():
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

    @app.get("/", include_in_schema=False)
    def frontend_root():
        return FileResponse(frontend_dist / "index.html")

    @app.get("/{full_path:path}", include_in_schema=False)
    def frontend_spa(full_path: str):
        if full_path.startswith("api/") or full_path == "health":
            raise HTTPException(status_code=404, detail="Not Found")

        candidate = frontend_dist / full_path
        if candidate.is_file():
            return FileResponse(candidate)

        return FileResponse(frontend_dist / "index.html")
else:
    logger.warning("Frontend build output not found at %s", frontend_dist)
