from app.services.ai_service import classify_report
from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.report_model import Report
# pyrefly: ignore [missing-import]
from app.exceptions.report_exceptions import ReportNotFoundException
from app.services.embedding_service import generate_embedding
from app.services.priority_service import calculate_priority
from app.services.similarity_service import check_duplicate_report


from app.models.incident_model import Incident

def get_department_for_category(category: str) -> str:
    cat = category.lower()
    
    # 1. Water Supply Department
    if "water" in cat or "pipeline" in cat: return "Water Supply Department"
    
    # 2. Road & Infrastructure Department
    if "road" in cat or "pothole" in cat or "traffic" in cat: return "Road & Infrastructure Department"
    
    # 3. Solid Waste Management Department
    if "waste" in cat or "garbage" in cat or "trash" in cat: return "Solid Waste Management Department"
    
    # 4. Drainage & Sewerage Department
    if "drain" in cat or "sewer" in cat or "flood" in cat: return "Drainage & Sewerage Department"
    
    # 5. Street Lighting Department
    if "light" in cat or "street light" in cat: return "Street Lighting Department"
    
    # 6. Public Health Department
    if "health" in cat or "disease" in cat or "mosquito" in cat: return "Public Health Department"
    
    # 7. Fire & Emergency Services
    if "fire" in cat or "emergency" in cat: return "Fire & Emergency Services"
    
    # 8. Parks & Garden Department
    if "park" in cat or "garden" in cat or "tree" in cat: return "Parks & Garden Department"
    
    # 9. Building & Town Planning Department
    if "building" in cat or "construction" in cat or "zoning" in cat: return "Building & Town Planning Department"
    
    # 10. Electrical Department
    if "electric" in cat or "wire" in cat or "power" in cat: return "Electrical Department"
    
    # 11. Sanitation Department
    if "sanitation" in cat or "cleaning" in cat or "toilet" in cat: return "Sanitation Department"
    
    # 12. Public Works Department
    if "public works" in cat or "infrastructure" in cat: return "Public Works Department"
    
    return "Public Works Department" # default fallback

def process_report(
    db: Session,
    title: str,
    description: str,
    location: str,
    latitude: float | None,
    longitude: float | None
):
    ai_result = classify_report(description)
    priority = calculate_priority(ai_result.severity)
    embedding = generate_embedding(description)
    
    duplicate_result = check_duplicate_report(db=db, embedding=embedding)
    
    incident_id = None
    if duplicate_result["is_duplicate"]:
        similar_report = db.query(Report).filter(Report.id == duplicate_result["report_id"]).first()
        if similar_report and similar_report.incident_id:
            incident_id = similar_report.incident_id
    
    if incident_id is None:
        incident = Incident(
            category=ai_result.category,
            severity=ai_result.severity,
            priority=priority,
            summary=ai_result.summary,
            location=location,
            latitude=latitude,
            longitude=longitude,
            department=get_department_for_category(ai_result.category),
            status="OPEN"
        )
        db.add(incident)
        db.commit()
        db.refresh(incident)
        incident_id = incident.id
        
        if duplicate_result["is_duplicate"]:
            similar_report = db.query(Report).filter(Report.id == duplicate_result["report_id"]).first()
            if similar_report and similar_report.incident_id is None:
                similar_report.incident_id = incident_id
                db.add(similar_report)

    report = Report(
        title=title,
        description=description,
        location=location,
        latitude=latitude,
        longitude=longitude,
        category=ai_result.category,
        severity=ai_result.severity,
        priority=priority,
        summary=ai_result.summary,
        embedding=embedding,
        incident_id=incident_id
    )

    db.add(report)
    db.commit()
    db.refresh(report)

    return report

def create_report(
    db: Session,
    title: str,
    description: str,
    location: str,
    latitude: float | None,
    longitude: float | None
):
    return process_report(
        db=db,
        title=title,
        description=description,
        location=location,
        latitude=latitude,
        longitude=longitude
    )

def get_all_reports(db: Session):
    return db.query(Report).all()


def get_report_by_id(db: Session, report_id: int):
    report = db.query(Report).filter(Report.id == report_id).first()

    if report is None:
        raise ReportNotFoundException()

    return report


def update_report(
    db: Session,
    report_id: int,
    title: str,
    description: str,
    location: str,
    latitude: float | None,
    longitude: float | None
):
    report = db.query(Report).filter(
        Report.id == report_id
    ).first()

    if report is None:
        raise HTTPException(
            status_code=404,
            detail="Report not found"
        )

    report.title = title
    report.description = description
    report.location = location
    report.latitude = latitude
    report.longitude = longitude

    db.commit()
    db.refresh(report)

    return report

def delete_report(db: Session, report_id: int):
    report = db.query(Report).filter(Report.id == report_id).first()

    if report is None:
        raise HTTPException(
            status_code=404,
            detail="Report not found"
        )

    db.delete(report)
    db.commit()

    return {
        "message": "Report deleted successfully",
        "report_id": report_id
    }