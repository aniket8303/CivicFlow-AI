from app.database.database import SessionLocal
from app.services.embedding_service import generate_embedding
from app.services.similarity_service import check_duplicate_report


text = "There is a water pipeline leak near Ward 5."

embedding = generate_embedding(text)

db = SessionLocal()

try:
    result = check_duplicate_report(
        db=db,
        embedding=embedding
    )

    print("\n===== DUPLICATE CHECK =====")
    print(result)

finally:
    db.close()