from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import List

from app.schemas.report_schema import ReportResponse

class IncidentBase(BaseModel):
    category: str
    severity: str
    priority: str
    summary: str
    location: str
    latitude: float | None
    longitude: float | None
    department: str
    status: str
    assigned_to: str | None = None
    remarks: str | None = None

class IncidentResponse(IncidentBase):
    id: int
    created_at: datetime
    updated_at: datetime | None
    report_count: int = 0

    model_config = ConfigDict(from_attributes=True)

class IncidentDetailResponse(IncidentResponse):
    reports: List[ReportResponse]

class IncidentUpdate(BaseModel):
    status: str | None = None
    assigned_to: str | None = None
    remarks: str | None = None
