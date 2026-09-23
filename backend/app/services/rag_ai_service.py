import os
import time

from dotenv import load_dotenv
from google import genai
from fastapi import HTTPException

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def generate_rag_answer(
    question: str,
    context: str
) -> str:

    prompt = f"""
You are CivicFlow-AI, a civic incident information assistant.

Answer the user's question using ONLY the CivicFlow report
information provided in the context below.

If the context does not contain enough information to answer
the question, clearly say that the available CivicFlow reports
do not contain enough information.

Do not invent incidents, locations, severity levels, priorities,
or other facts.

CivicFlow Context:
{context}

User Question:
{question}

Provide a concise and clear answer.
"""

    max_retries = 3

    for attempt in range(max_retries):

        try:
            response = client.models.generate_content(
                model="gemini-3.5-flash-lite",
                contents=prompt
            )

            return response.text

        except Exception as e:

            print(
                f"Gemini RAG error "
                f"(attempt {attempt + 1}/{max_retries}):",
                e
            )

            if attempt < max_retries - 1:

                wait_time = 2 ** attempt

                print(
                    f"Retrying RAG generation "
                    f"in {wait_time} seconds..."
                )

                time.sleep(wait_time)

            else:

                raise HTTPException(
                    status_code=503,
                    detail="RAG AI service is temporarily unavailable. Please try again later."
                )