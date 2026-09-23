from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database.database import get_db
from app.schemas.incident_schema import (
    IncidentResponse,
    IncidentDetailResponse,
    IncidentUpdate
)
from app.services import incident_service

router = APIRouter()

@router.get("/incidents", response_model=List[IncidentResponse])
def get_incidents(db: Session = Depends(get_db)):
    return incident_service.get_all_incidents(db)

@router.get("/incidents/{incident_id}", response_model=IncidentDetailResponse)
def get_incident(incident_id: int, db: Session = Depends(get_db)):
    return incident_service.get_incident_by_id(db, incident_id)

@router.put("/incidents/{incident_id}", response_model=IncidentResponse)
def update_incident(
    incident_id: int,
    incident_update: IncidentUpdate,
    db: Session = Depends(get_db)
):
    return incident_service.update_incident(
        db, 
        incident_id, 
        status=incident_update.status,
        assigned_to=incident_update.assigned_to,
        remarks=incident_update.remarks
    )
