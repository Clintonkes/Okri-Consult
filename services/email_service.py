from __future__ import annotations

import logging
from typing import Iterable

try:
    import resend
except ImportError:  # pragma: no cover - handled at runtime in deployment
    resend = None

from config import settings

logger = logging.getLogger(__name__)


def _configured() -> bool:
    return bool(settings.RESEND_API_KEY and resend is not None)


def _send_email(*, to: Iterable[str], subject: str, html: str, reply_to: str | None = None) -> bool:
    if not _configured():
        logger.info("Resend is not configured; skipping email: %s", subject)
        return False

    resend.api_key = settings.RESEND_API_KEY

    params = {
        "from": settings.RESEND_FROM_EMAIL,
        "to": list(to),
        "subject": subject,
        "html": html,
    }
    if reply_to:
        params["reply_to"] = reply_to

    try:
        resend.Emails.send(params)
        return True
    except Exception:
        logger.exception("Failed to send email: %s", subject)
        return False


def booking_confirmation_email(name: str, service_type: str, status: str) -> str:
    return f"""
    <div style="font-family:Arial,sans-serif;color:#201b17;line-height:1.6">
      <h2 style="color:#6f4526">Booking received</h2>
      <p>Hi {name},</p>
      <p>We have received your booking request for <strong>{service_type}</strong>.</p>
      <p>Current status: <strong>{status.title()}</strong></p>
      <p>We will follow up with the next steps shortly.</p>
      <p>Okri Consult LLC</p>
    </div>
    """


def booking_status_email(name: str, service_type: str, status: str) -> str:
    message_map = {
        "approved": "Your booking has been approved. We will contact you to confirm the schedule.",
        "completed": "Your booking has been completed. Thank you for choosing Okri Consult LLC.",
        "denied": "Your booking has been declined. Please contact us if you would like to discuss alternatives.",
        "pending": "Your booking is pending review.",
    }
    message = message_map.get(status, f"Your booking status has been updated to {status}.")
    return f"""
    <div style="font-family:Arial,sans-serif;color:#201b17;line-height:1.6">
      <h2 style="color:#6f4526">Booking update</h2>
      <p>Hi {name},</p>
      <p>{message}</p>
      <p><strong>Service:</strong> {service_type}</p>
      <p><strong>Status:</strong> {status.title()}</p>
      <p>Okri Consult LLC</p>
    </div>
    """


def contact_ack_email(name: str, subject: str) -> str:
    return f"""
    <div style="font-family:Arial,sans-serif;color:#201b17;line-height:1.6">
      <h2 style="color:#6f4526">We received your message</h2>
      <p>Hi {name},</p>
      <p>Thanks for reaching out about <strong>{subject}</strong>. Our team has received your message and will respond as soon as possible.</p>
      <p>Okri Consult LLC</p>
    </div>
    """


def admin_notification_email(title: str, body: str) -> str:
    return f"""
    <div style="font-family:Arial,sans-serif;color:#201b17;line-height:1.6">
      <h2 style="color:#6f4526">{title}</h2>
      <div>{body}</div>
    </div>
    """


def send_booking_received_email(name: str, email: str, service_type: str, status: str = "pending") -> None:
    _send_email(
        to=[email],
        subject="We received your booking request",
        html=booking_confirmation_email(name, service_type, status),
    )


def send_booking_status_update_email(name: str, email: str, service_type: str, status: str) -> None:
    _send_email(
        to=[email],
        subject=f"Your booking is now {status}",
        html=booking_status_email(name, service_type, status),
    )


def send_admin_booking_notification(name: str, email: str, service_type: str, status: str) -> None:
    _send_email(
        to=[settings.ADMIN_EMAIL],
        subject=f"New booking: {name} - {service_type}",
        html=admin_notification_email(
            "New booking submitted",
            f"""
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Service:</strong> {service_type}</p>
            <p><strong>Status:</strong> {status.title()}</p>
            """,
        ),
    )


def send_contact_ack_email(name: str, email: str, subject: str) -> None:
    _send_email(
        to=[email],
        subject="We received your message",
        html=contact_ack_email(name, subject),
    )


def send_admin_contact_notification(name: str, email: str, subject: str, message: str) -> None:
    _send_email(
        to=[settings.ADMIN_EMAIL],
        subject=f"New contact submission: {subject}",
        html=admin_notification_email(
            "New contact submission",
            f"""
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Subject:</strong> {subject}</p>
            <p><strong>Message:</strong> {message}</p>
            """,
        ),
    )
