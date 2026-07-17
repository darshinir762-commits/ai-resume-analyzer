def calculate_ats(resume_text, resume_skills, job_description):

    score = 0

    matched_skills = []
    missing_skills = []

    required_skills = [
        "python",
        "java",
        "c++",
        "html",
        "css",
        "javascript",
        "react",
        "node",
        "express",
        "mongodb",
        "sql",
        "mysql",
        "fastapi",
        "flask",
        "git",
        "docker",
        "aws",
    ]

    if job_description.strip():
        jd_skills = [
            skill
            for skill in required_skills
            if skill in job_description.lower()
        ]
    else:
        jd_skills = required_skills

    resume_lower = [skill.lower() for skill in resume_skills]

    # -----------------------
    # Skills (40 marks)
    # -----------------------
    if len(jd_skills) > 0:

        for skill in jd_skills:
            if skill in resume_lower:
                matched_skills.append(skill)
            else:
                missing_skills.append(skill)

        score += int((len(matched_skills) / len(jd_skills)) * 40)

    # -----------------------
    # Projects (25 marks)
    # -----------------------
    project_keywords = [
        "project",
        "github",
        "developed",
        "built",
        "implemented"
    ]

    project_count = 0

    for word in project_keywords:
        if word in resume_text.lower():
            project_count += 1

    score += min(project_count * 5, 25)

    # -----------------------
    # Education (15 marks)
    # -----------------------
    education_keywords = [
        "b.tech",
        "b.e",
        "be",
        "bachelor",
        "mca",
        "bca"
    ]

    if any(word in resume_text.lower() for word in education_keywords):
        score += 15

    # -----------------------
    # Certifications (10 marks)
    # -----------------------
    cert_keywords = [
        "certificate",
        "certification",
        "coursera",
        "udemy",
        "nptel"
    ]

    if any(word in resume_text.lower() for word in cert_keywords):
        score += 10

    # -----------------------
    # Resume Sections (10 marks)
    # -----------------------
    section_keywords = [
        "skills",
        "education",
        "projects",
        "experience"
    ]

    found = 0

    for section in section_keywords:
        if section in resume_text.lower():
            found += 1

    score += int((found / len(section_keywords)) * 10)

    return {
        "ats_score": min(score, 100),
        "matched_skills": matched_skills,
        "missing_skills": missing_skills
    }