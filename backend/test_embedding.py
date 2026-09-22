from app.services.embedding_service import generate_embedding


text = "The water pipeline near Ward 5 has burst."

embedding = generate_embedding(text)

print("Embedding generated successfully")
print("Dimensions:", len(embedding))
print("First 10 values:", embedding[:10])