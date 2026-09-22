from sqlalchemy.orm import Session
from sqlalchemy import select

from app.models.report_model import Report


SIMILARITY_THRESHOLD = 0.20


def find_similar_reports(
    db: Session,
    embedding: list[float],
    limit: int = 5
):
    query = (
        select(
            Report,
            Report.embedding.cosine_distance(embedding).label("distance")
        )
        .where(Report.embedding.is_not(None))
        .order_by("distance")
        .limit(limit)
    )

    return db.execute(query).all()


def check_duplicate_report(
    db: Session,
    embedding: list[float],
    threshold: float = 0.20
):
    results = find_similar_reports(
        db=db,
        embedding=embedding,
        limit=1
    )

    if not results:
        return {
            "is_duplicate": False,
            "message": "No existing reports found."
        }

    report, distance = results[0]

    distance = float(distance)

    return {
        "is_duplicate": distance <= threshold,
        "report_id": report.id,
        "title": report.title,
        "distance": distance,
        "threshold": threshold
    }