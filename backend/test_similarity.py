from app.database.database import SessionLocal

from app.services.embedding_service import generate_embedding
from app.services.similarity_service import find_similar_reports


text = "There is a water pipeline leak near Ward 5."

embedding = generate_embedding(text)

db = SessionLocal()

try:
    results = find_similar_reports(
        db=db,
        embedding=embedding,
        limit=5
    )

    print("\nSimilar reports:")

    for report, distance in results:
        print(
            f"ID: {report.id} | "
            f"Title: {report.title} | "
            f"Distance: {distance:.4f}"
        )

finally:
    db.close()