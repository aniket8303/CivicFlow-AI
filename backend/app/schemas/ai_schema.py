from pydantic import BaseModel


class AIReportResponse(BaseModel):
    category: str
    severity: str
    priority: str
    summary: str