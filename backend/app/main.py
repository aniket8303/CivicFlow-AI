from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import report_router
from app.database import database
from app.routers.similarity_router import router as similarity_router
from app.routers.rag_router import router as rag_router


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    report_router.router,
    prefix="/api"
)
app.include_router(similarity_router, prefix="/api")
app.include_router(rag_router, prefix="/api")

@app.get("/api/health")
def health_check():
    return {
        "status": "CivicFlow-AI is Running..."
    }