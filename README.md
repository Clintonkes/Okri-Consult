# Okri Consult LLC - Professional Cleaning Website

A premium full-stack cleaning company website built with FastAPI backend and React frontend.

## Project Structure

```
okri-consult/
├── backend/                 # FastAPI backend
│   ├── main.py             # Main application entry point
│   ├── core/               # Configuration, database, security
│   ├── models/             # SQLAlchemy database models
│   ├── schemas/            # Pydantic schemas for validation
│   ├── crud/               # CRUD operations
│   └── api/routes/         # API endpoints
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── Pages/          # Page components
│   │   └── services/       # API services
│   ├── vite.config.js
│   └── package.json
├── Dockerfile              # Backend Docker image
├── frontend/Dockerfile     # Frontend Docker image
└── docker-compose.yml      # Development deployment
```

## Features

### Frontend
- Responsive design with Tailwind CSS
- Modern UI with gradients and smooth transitions
- Pages: Home, About, Services, Booking, Testimonials, FAQ, Contact, Admin

### Backend
- FastAPI with JWT authentication
- SQLite database with SQLAlchemy ORM
- Protected admin routes
- CORS support for frontend integration

### Admin Dashboard
- Booking management
- Contact message management
- Testimonial management
- Secure login/logout

## Deployment

1. **Railway**: Uses `railway.json` for automatic deployment
2. **Docker**: Run `docker-compose up -d` for local development

## Environment Variables

Backend `.env`:
```
SECRET_KEY=your-secret-key
ADMIN_EMAIL=okriconsult@proton.me
ADMIN_PASSWORD=your-secure-password
```

## Colors
- Primary: Deep blue (#1d4ed8)
- Secondary: Cyan/teal (#0d9488)
- Accent: Green (#22c55e)
- Background: White
- Neutral: Light gray