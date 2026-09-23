from pydantic import BaseModel


class DashboardStats(BaseModel):
    open_incidents: int
    p1_incidents: int
    resolved_today: int
    total_reports: int