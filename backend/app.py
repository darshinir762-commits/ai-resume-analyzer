from flask import Flask, request, jsonify
from flask_cors import CORS
import os

from parser import extract_text, extract_details
from ats import calculate_ats
from gemini import generate_questions

from database import db, Resume
from auth import auth, bcrypt

app = Flask(__name__)
CORS(app)

# -----------------------------
# Database Configuration
# -----------------------------
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///users.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)
bcrypt.init_app(app)

app.register_blueprint(auth)

# -----------------------------
# Upload Folder
# -----------------------------
UPLOAD_FOLDER = "uploads"

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
# -----------------------------
# Upload Resume
# -----------------------------
@app.route("/upload", methods=["POST"])
def upload_resume():

    if "resume" not in request.files:
        return jsonify({"error": "No resume uploaded"}), 400

    file = request.files["resume"]

    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    file_path = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
    file.save(file_path)

    # -----------------------------
    # Extract Resume Text
    # -----------------------------
    text = extract_text(file_path)

    # -----------------------------
    # Extract Candidate Details
    # -----------------------------
    details = extract_details(text)

    # -----------------------------
    # Job Description
    # -----------------------------
    job_description = request.form.get("job_description", "")

    # -----------------------------
    # ATS Analysis
    # -----------------------------
    ats = calculate_ats(
    text,
    details["skills"],
    job_description
)

    details["ats_score"] = ats["ats_score"]
    details["matched_skills"] = ats["matched_skills"]
    details["missing_skills"] = ats["missing_skills"]
    details["job_match"] = ats["ats_score"]

    # -----------------------------
    # Resume Text
    # -----------------------------
    details["resume_text"] = text

    # -----------------------------
    # AI Suggestions
    # -----------------------------
    suggestions = []

    if "github" not in text.lower():
        suggestions.append("Add your GitHub repository link.")

    if "linkedin" not in text.lower():
        suggestions.append("Add your LinkedIn profile.")

    if ats["ats_score"] < 80:
        suggestions.append("Improve your resume by adding more relevant technical skills.")

    if "internship" not in text.lower():
        suggestions.append("Mention internships or work experience.")

    if "certification" not in text.lower():
        suggestions.append("Add relevant certifications.")

    if len(ats["missing_skills"]) > 0:
        suggestions.append(
            "Learn these skills: " +
            ", ".join(ats["missing_skills"])
        )

    details["suggestions"] = suggestions

    # -----------------------------
    # Gemini Interview Questions
    # -----------------------------
    questions = generate_questions(text)
    details["interview_questions"] = questions

    # -----------------------------
    # Save Resume History
    # -----------------------------
    user_id = request.form.get("user_id")

    if user_id:
        resume = Resume(
            filename=file.filename,
            ats_score=details["ats_score"],
            user_id=int(user_id)
        )

        db.session.add(resume)
        db.session.commit()

    return jsonify(details)
# -----------------------------
# Resume History
# -----------------------------
@app.route("/history/<int:user_id>", methods=["GET"])
def history(user_id):

    resumes = Resume.query.filter_by(user_id=user_id).all()

    history_data = []

    for resume in resumes:

        history_data.append({
            "id": resume.id,
            "filename": resume.filename,
            "ats_score": resume.ats_score,
            "uploaded_at": resume.uploaded_at.strftime("%d-%m-%Y %H:%M")
        })

    return jsonify(history_data)
# -----------------------------
# Run Application
# -----------------------------
if __name__ == "__main__":

    with app.app_context():
        db.create_all()

    app.run(debug=True)