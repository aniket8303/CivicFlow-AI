from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.database.database import get_db
from app.services.embedding_service import generate_embedding
from app.services.similarity_service import check_duplicate_report


router = APIRouter(
    prefix="/similarity",
    tags=["Similarity"]
)


class SimilarityRequest(BaseModel):
    complaint: str


@router.post("/check")
def check_similarity(
    request: SimilarityRequest,
    db: Session = Depends(get_db)
):
    embedding = generate_embedding(request.complaint)

    result = check_duplicate_report(
        db=db,
        embedding=embedding
    )

    return result