import os
from dotenv import load_dotenv
from google import genai
from pydantic import BaseModel
from fastapi import HTTPException

from app.schemas.ai_schema import AIReportResponse

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def classify_report(complaint: str) -> AIReportResponse:

    prompt = f"""
You are CivicFlow-AI, a civic incident classification assistant.

Analyze the following citizen complaint.

Categories:
- Water
- Lighting
- Road
- Dust

Severity:
- Low
- Medium
- High
- Critical

Priority:
- Low
- Medium
- High
- Urgent

Generate a short summary.

Citizen complaint:
{complaint}
"""

    try:
        response = client.models.generate_content(
            model="gemini-3.5-flash-lite",
            contents=prompt,
            config={
                "response_mime_type": "application/json",
                "response_schema": AIReportResponse,
            },
        )

        return AIReportResponse.model_validate_json(response.text)

    except Exception as e:
        print("Gemini API error:", e)

        raise HTTPException(
            status_code=503,
            detail="AI service is temporarily unavailable. Please try again later."
        )