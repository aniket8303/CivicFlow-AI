from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.report_schema import ReportCreate, ReportUpdate, ReportResponse

from app.services.report_service import (
    create_report,
    get_all_reports,
    get_report_by_id,
    update_report,
    delete_report
)

from app.services.incident_intelligence_service import (
    generate_incident_intelligence
)

router = APIRouter()


@router.post("/reports", response_model=ReportResponse)
def create_report_endpoint(
    report: ReportCreate,
    db: Session = Depends(get_db)
):
    return create_report(
    db=db,
    title=report.title,
    description=report.description,
    location=report.location,
    latitude=report.latitude,
    longitude=report.longitude
)


@router.get("/reports", response_model=list[ReportResponse])
def get_reports(
    db: Session = Depends(get_db)
):
    return get_all_reports(db)

@router.get("/reports/{report_id}", response_model=ReportResponse)
def get_report(
    report_id: int,
    db: Session = Depends(get_db)
):
    return get_report_by_id(
        db=db,
        report_id=report_id
    )

@router.put("/reports/{report_id}", response_model=ReportResponse)
def update_report_endpoint(
    report_id: int,
    report: ReportUpdate,
    db: Session = Depends(get_db)
):
    return update_report(
        db=db,
        report_id=report_id,
        title=report.title,
        description=report.description,
        location=report.location,
        latitude=report.latitude,
        longitude=report.longitude
    )


@router.delete("/reports/{report_id}")
def delete_report_endpoint(
    report_id: int,
    db: Session = Depends(get_db)
):
    return delete_report(
        db=db,
        report_id=report_id
    )

@router.get("/reports/{report_id}/intelligence")
def get_incident_intelligence(
    report_id: int,
    db: Session = Depends(get_db)
):
    result = generate_incident_intelligence(
        db=db,
        report_id=report_id
    )

    if result is None:
        raise HTTPException(
            status_code=404,
            detail="Report not found"
        )

    return result

