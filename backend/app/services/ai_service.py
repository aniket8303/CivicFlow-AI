import time
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

    max_retries = 3

    for attempt in range(max_retries):

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

            print(f"Gemini API error (attempt {attempt + 1}/{max_retries}):", e)

            if attempt < max_retries - 1:
                wait_time = 2 ** attempt
                print(f"Retrying in {wait_time} seconds...")
                time.sleep(wait_time)

            else:
                raise HTTPException(
                    status_code=503,
                    detail="AI service is temporarily unavailable. Please try again later."
                )