from app.database.database import SessionLocal
from app.models.report_model import Report
from app.services.embedding_service import generate_embedding


db = SessionLocal()

try:
    reports = (
        db.query(Report)
        .filter(Report.embedding.is_(None))
        .all()
    )

    print(f"Reports needing embeddings: {len(reports)}")

    for report in reports:
        print(f"Generating embedding for report ID: {report.id}")

        report.embedding = generate_embedding(report.description)

    db.commit()

    print("All embeddings generated successfully.")

finally:
    db.close()