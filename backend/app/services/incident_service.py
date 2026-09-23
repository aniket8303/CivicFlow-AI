from sqlalchemy.orm import Session
from app.models.incident_model import Incident
from app.models.report_model import Report
from fastapi import HTTPException

def get_all_incidents(db: Session):
    incidents = db.query(Incident).order_by(Incident.created_at.desc()).all()
    
    results = []
    for inc in incidents:
        count = db.query(Report).filter(Report.incident_id == inc.id).count()
        inc_dict = inc.__dict__.copy()
        inc_dict["report_count"] = count
        results.append(inc_dict)
    return results

def get_incident_by_id(db: Session, incident_id: int):
    incident = db.query(Incident).filter(Incident.id == incident_id).first()
    if not incident:
        raise HTTPException(status_code=404, detail="Incident not found")
    
    reports = db.query(Report).filter(Report.incident_id == incident_id).all()
    
    inc_dict = incident.__dict__.copy()
    inc_dict["report_count"] = len(reports)
    inc_dict["reports"] = reports
    return inc_dict

def update_incident(db: Session, incident_id: int, status: str | None, assigned_to: str | None, remarks: str | None):
    incident = db.query(Incident).filter(Incident.id == incident_id).first()
    if not incident:
        raise HTTPException(status_code=404, detail="Incident not found")
    
    if status is not None:
        incident.status = status
    if assigned_to is not None:
        incident.assigned_to = assigned_to
    if remarks is not None:
        incident.remarks = remarks
        
    db.commit()
    db.refresh(incident)
    
    count = db.query(Report).filter(Report.incident_id == incident_id).count()
    inc_dict = incident.__dict__.copy()
    inc_dict["report_count"] = count
    
    return inc_dict
