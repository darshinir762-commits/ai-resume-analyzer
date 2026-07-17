import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))


def generate_questions(resume_text):
    prompt = f"""
You are an experienced technical interviewer.

Based on the following resume, generate 10 technical interview questions.

Resume:
{resume_text}

Instructions:
- Return ONLY the questions.
- One question per line.
- Do not include answers.
"""

    try:
        model = genai.GenerativeModel("gemini-2.5-flash")

        response = model.generate_content(prompt)

        text = response.text.strip()

        questions = [
            q.strip()
            for q in text.split("\n")
            if q.strip()
        ]

        return questions

    except Exception as e:
        print("Gemini Error:", e)

        return [
            "Explain Python OOP concepts.",
            "What is React?",
            "Explain SQL JOIN.",
            "Difference between SQL and MySQL?",
            "What is JavaScript closure?",
            "Explain REST API.",
            "What is Git?",
            "Difference between HTML and HTML5?",
            "Explain Machine Learning.",
            "Tell me about one of your projects."
        ]