from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.services.analytics_service import (
    get_category_counts,
    get_severity_counts,
    get_priority_counts,
    get_analytics_overview,
    get_location_counts,
    get_geographic_reports,
    get_hotspots
)

router = APIRouter(
    prefix="/api/analytics",
    tags=["Analytics"]
)


@router.get("/categories")
def category_analytics(
    db: Session = Depends(get_db)
):
    return get_category_counts(db)

@router.get("/severity")
def severity_analytics(
    db: Session = Depends(get_db)
):
    return get_severity_counts(db)

@router.get("/priority")
def priority_analytics(
    db: Session = Depends(get_db)
):
    return get_priority_counts(db)

@router.get("/overview")
def analytics_overview(
    db: Session = Depends(get_db)
):
    return get_analytics_overview(db)


@router.get("/locations")
def location_analytics(
    db: Session = Depends(get_db)
):
    return get_location_counts(db)

@router.get("/geographic-reports")
def geographic_reports(
    db: Session = Depends(get_db)
):
    return get_geographic_reports(db)

@router.get("/hotspots")
def hotspot_analytics(
    db: Session = Depends(get_db)
):
    return get_hotspots(db)