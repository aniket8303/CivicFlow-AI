from sqlalchemy.orm import Session
from sqlalchemy import select

from app.models.report_model import Report


def retrieve_relevant_reports(
    db: Session,
    query_embedding: list[float],
    limit: int = 5,
    exclude_report_id: int | None = None
):
    # Retrieve more candidates first
    candidate_limit = limit * 3

    query = (
        select(
            Report,
            Report.embedding.cosine_distance(query_embedding).label("distance")
        )
        .where(Report.embedding.is_not(None))
    )

    if exclude_report_id is not None:
        query = query.where(Report.id != exclude_report_id)

    query = (
        query
        .order_by("distance")
        .limit(candidate_limit)
    )

    results = db.execute(query).all()

    # Remove exact duplicate descriptions
    unique_results = []
    seen_descriptions = set()

    for report, distance in results:

        description_key = report.description.strip().lower()

        if description_key in seen_descriptions:
            continue

        seen_descriptions.add(description_key)

        unique_results.append((report, distance))

        if len(unique_results) >= limit:
            break

    return unique_results

def build_rag_context(results):
    context_parts = []

    for report, distance in results:
        context_parts.append(
            f"""
Report ID: {report.id}
Title: {report.title}
Description: {report.description}
Category: {report.category}
Severity: {report.severity}
Priority: {report.priority}
Similarity distance: {float(distance):.4f}
"""
        )

    return "\n---\n".join(context_parts)