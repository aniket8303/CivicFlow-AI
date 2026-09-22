from app.database.database import SessionLocal

from app.services.embedding_service import generate_embedding
from app.services.rag_service import (
    retrieve_relevant_reports,
    build_rag_context
)
from app.services.rag_ai_service import generate_rag_answer


question = "Are there any water pipeline problems near Ward 5?"

query_embedding = generate_embedding(question)

db = SessionLocal()

try:
    results = retrieve_relevant_reports(
        db=db,
        query_embedding=query_embedding,
        limit=5
    )

    context = build_rag_context(results)

    print("\n===== RAG CONTEXT =====\n")
    print(context)

    answer = generate_rag_answer(
        question=question,
        context=context
    )

    print("\n===== RAG ANSWER =====\n")
    print(answer)

finally:
    db.close()