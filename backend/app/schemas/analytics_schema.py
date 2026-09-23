from pydantic import BaseModel


class AnalyticsCount(BaseModel):
    name: str
    count: int

class AnalyticsOverview(BaseModel):
    categories: list[AnalyticsCount]
    severity: list[AnalyticsCount]
    priority: list[AnalyticsCount]
    locations: list[AnalyticsCount]