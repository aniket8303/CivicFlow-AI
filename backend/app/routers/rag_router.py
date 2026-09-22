from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.services.embedding_service import generate_embedding
from app.services.rag_service import (
    retrieve_relevant_reports,
    build_rag_context
)
from app.services.rag_ai_service import generate_rag_answer


router = APIRouter(
    prefix="/rag",
    tags=["RAG"]
)


class RAGRequest(BaseModel):
    question: str


@router.post("/ask")
def ask_rag(
    request: RAGRequest,
    db: Session = Depends(get_db)
):
    query_embedding = generate_embedding(request.question)

    results = retrieve_relevant_reports(
        db=db,
        query_embedding=query_embedding,
        limit=5
    )

    context = build_rag_context(results)

    answer = generate_rag_answer(
        question=request.question,
        context=context
    )

    sources = []

    for report, distance in results:
        sources.append({
            "report_id": report.id,
            "title": report.title,
            "distance": float(distance)
        })

    return {
        "question": request.question,
        "answer": answer,
        "sources": sources
    }