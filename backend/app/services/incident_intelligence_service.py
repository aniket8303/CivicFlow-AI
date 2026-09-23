from sqlalchemy.orm import Session

from app.services.embedding_service import generate_embedding
from app.services.rag_service import (
    retrieve_relevant_reports,
    build_rag_context
)
from app.services.rag_ai_service import generate_rag_answer
from app.models.report_model import Report


def generate_incident_intelligence(
    db: Session,
    report_id: int
):
    # Step 1: Get the report
    report = (
        db.query(Report)
        .filter(Report.id == report_id)
        .first()
    )

    if report is None:
        return None

    # Step 2: Generate embedding from report description
    query_embedding = generate_embedding(
        report.description
    )

    # Step 3: Retrieve related existing reports
    results = retrieve_relevant_reports(
        db=db,
        query_embedding=query_embedding,
        limit=5,
        exclude_report_id=report.id
    )

    # Step 4: Build RAG context
    context = build_rag_context(results)

    # Step 5: Generate grounded AI answer
    question = (
        f"What existing civic incidents are relevant "
        f"to this report: {report.description}"
    )

    answer = generate_rag_answer(
        question=question,
        context=context
    )

    # Step 6: Build source information
    sources = []

    for related_report, distance in results:
        sources.append({
            "report_id": related_report.id,
            "title": related_report.title,
            "distance": float(distance)
        })

    return {
        "report_id": report.id,
        "title": report.title,
        "category": report.category,
        "severity": report.severity,
        "priority": report.priority,
        "answer": answer,
        "sources": sources
    }