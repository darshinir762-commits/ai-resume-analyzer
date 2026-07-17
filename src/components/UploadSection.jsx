import { useState } from "react";
import { FaUpload } from "react-icons/fa";
import api from "../services/api";
import "../styles/UploadSection.css";

function UploadSection({ setCandidate }) {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [resumeText, setResumeText] = useState("");

  const handleResume = (e) => {
    setResume(e.target.files[0]);
  };

  const analyzeResume = async () => {
    if (!resume) {
      alert("Please upload a resume.");
      return;
    }

const formData = new FormData();

const user = JSON.parse(localStorage.getItem("user"));

formData.append("resume", resume);
formData.append("job_description", jobDescription);

if (user) {
  formData.append("user_id", user.id);
}

    try {
      setLoading(true);

      const response = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);

      setResumeText(response.data.resume_text);

      if (setCandidate) {
        setCandidate(response.data);
      }

      alert("Resume uploaded and analyzed successfully!");

    } catch (error) {
      console.error(error);

      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
      }

      alert("Backend connection failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Your Resume</h2>

      <div className="upload-box">
        <FaUpload className="upload-icon" />

        <input
          type="file"
          accept=".pdf"
          onChange={handleResume}
        />

        {resume && (
          <p className="file-name">
            📄 {resume.name}
          </p>
        )}
      </div>

      <textarea
        placeholder="Paste Job Description Here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      <button
        onClick={analyzeResume}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {resumeText && (
        <div
         style={{
         marginTop: "30px",
         background: "#fff",
         padding: "20px",
         borderRadius: "10px",
         whiteSpace: "pre-wrap",
         textAlign: "left",
         }}
        >
          <h3>Extracted Resume Text</h3>

          <p>{resumeText}</p>
        </div>
      )}
    </div>
  );
}

export default UploadSection;