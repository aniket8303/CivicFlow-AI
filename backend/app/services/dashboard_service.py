from sqlalchemy.orm import Session

from app.models.report_model import Report


from sqlalchemy import func
from datetime import date
from app.models.incident_model import Incident

def get_dashboard_stats(db: Session):
    open_incidents = db.query(Incident).filter(Incident.status.ilike("open")).count()
    p1_incidents = db.query(Incident).filter(Incident.priority.ilike("p1")).count()
    
    today = date.today()
    resolved_today = db.query(Incident).filter(
        Incident.status.ilike("resolved"),
        func.date(Incident.updated_at) == today
    ).count()

    total_reports = db.query(Report).count()

    return {
        "open_incidents": open_incidents,
        "p1_incidents": p1_incidents,
        "resolved_today": resolved_today,
        "total_reports": total_reports
    }