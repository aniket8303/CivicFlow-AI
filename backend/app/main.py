# pyrefly: ignore [missing-import]
from fastapi import FastAPI
from app.routers import report_router
from app.database import database


app = FastAPI()


app.include_router(
    report_router.router,
    prefix="/api"
)


@app.get("/api/health")
def health_check():
    return {
        "status": "CivicFlow-AI is Running..."
    }