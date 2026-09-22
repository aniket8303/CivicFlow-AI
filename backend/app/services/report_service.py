from app.services.ai_service import classify_report
from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.report_model import Report
# pyrefly: ignore [missing-import]
from app.exceptions.report_exceptions import ReportNotFoundException
from app.services.embedding_service import generate_embedding


def create_report(db: Session, title: str, description: str, location: str):

    ai_result = classify_report(description)

    embedding = generate_embedding(description)

    report = Report(
        title=title,
        description=description,
        location=location,
        category=ai_result.category,
        severity=ai_result.severity,
        priority=ai_result.priority,
        summary=ai_result.summary,
        embedding=embedding
    )

    db.add(report)
    db.commit()
    db.refresh(report)

    return report


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
    location: str
):
    report = db.query(Report).filter(Report.id == report_id).first()

    if report is None:
        raise HTTPException(
            status_code=404,
            detail="Report not found"
        )

    report.title = title
    report.description = description
    report.location = location

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