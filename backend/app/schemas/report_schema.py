from pydantic import BaseModel, Field, ConfigDict


class ReportCreate(BaseModel):
    title: str = Field(min_length=3, max_length=50)
    description: str = Field(min_length=10, max_length=500)
    location: str = Field(min_length=2, max_length=100)


class ReportUpdate(BaseModel):
    title: str = Field(min_length=3, max_length=50)
    description: str = Field(min_length=10, max_length=500)
    location: str = Field(min_length=2, max_length=100)


class ReportResponse(BaseModel):
    id: int
    title: str
    description: str
    location: str

    model_config = ConfigDict(from_attributes=True)
    