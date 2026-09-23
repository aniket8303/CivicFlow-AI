from pydantic import BaseModel, Field, ConfigDict


class ReportCreate(BaseModel):
    title: str = Field(min_length=3, max_length=50)
    description: str = Field(min_length=10, max_length=500)
    location: str = Field(min_length=2, max_length=100)

    latitude: float | None = None
    longitude: float | None = None


class ReportUpdate(BaseModel):
    title: str = Field(min_length=3, max_length=50)
    description: str = Field(min_length=10, max_length=500)
    location: str = Field(min_length=2, max_length=100)

    latitude: float | None = None
    longitude: float | None = None


class ReportResponse(BaseModel):
    id: int
    title: str
    description: str
    location: str

    latitude: float | None
    longitude: float | None

    category: str
    severity: str
    priority: str
    summary: str
    incident_id: int | None = None

    model_config = ConfigDict(from_attributes=True)
    