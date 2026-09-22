import os

from dotenv import load_dotenv
from google import genai

from app.schemas.ai_schema import AIReportResponse

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

    response = client.models.generate_content(
        model="gemini-3.5-flash-lite",
        contents=prompt
    )

    return response.text