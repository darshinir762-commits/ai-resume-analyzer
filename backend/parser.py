import re
import pdfplumber


def extract_text(pdf_path):
    text = ""

    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"

    return text


def extract_details(text):

    email = ""
    phone = ""
    name = ""
    education = ""
    university = ""

    # Email
    email_match = re.search(r'[\w\.-]+@[\w\.-]+\.\w+', text)
    if email_match:
        email = email_match.group()

    # Phone
    phone_match = re.search(r'(\+91[- ]?)?[6-9]\d{9}', text)
    if phone_match:
        phone = phone_match.group()

    # Name
    lines = text.split("\n")

    for line in lines:
        line = line.strip()

        if (
            len(line.split()) >= 2
            and len(line) < 40
            and "resume" not in line.lower()
            and "email" not in line.lower()
            and "linkedin" not in line.lower()
            and "github" not in line.lower()
        ):
            name = line
            break

    # Education
    education_keywords = [
        "B.Tech",
        "Bachelor",
        "B.E",
        "BE",
        "M.Tech",
        "MBA",
        "BCA",
        "MCA"
    ]

    for line in lines:
        for word in education_keywords:
            if word.lower() in line.lower():
                education = line.strip()
                break

    # University
    for line in lines:
        if (
            "University" in line
            or "College" in line
            or "Institute" in line
        ):
            university = line.strip()
            break

    skills_database = [
        "Python",
        "Java",
        "C",
        "C++",
        "JavaScript",
        "HTML",
        "CSS",
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "SQL",
        "MySQL",
        "FastAPI",
        "Flask",
        "Git",
        "GitHub",
        "Power BI",
        "Machine Learning",
        "Deep Learning",
        "TensorFlow",
        "Pandas",
        "NumPy",
        "LangChain",
        "ChromaDB",
        "Ollama",
        "Docker",
        "AWS"
    ]

    found_skills = []

    for skill in skills_database:
        if skill.lower() in text.lower():
            found_skills.append(skill)

    return {
        "name": name,
        "email": email,
        "phone": phone,
        "education": education,
        "university": university,
        "skills": found_skills,
        "resume_text": text
    }