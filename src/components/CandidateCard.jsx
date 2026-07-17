import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaUniversity,
} from "react-icons/fa";

import "../styles/CandidateCard.css";

function CandidateCard({ candidate }) {
  return (
    <div className="candidate-card">
      <h2>Candidate Information</h2>

      <div className="info-row">
        <FaUser className="icon" />
        <span>
          <strong>Name:</strong> {candidate?.name || "--------"}
        </span>
      </div>

      <div className="info-row">
        <FaEnvelope className="icon" />
        <span>
          <strong>Email:</strong> {candidate?.email || "--------"}
        </span>
      </div>

      <div className="info-row">
        <FaPhone className="icon" />
        <span>
          <strong>Phone:</strong> {candidate?.phone || "--------"}
        </span>
      </div>

      <div className="info-row">
        <FaGraduationCap className="icon" />
        <span>
          <strong>Education:</strong> {candidate?.education || "--------"}
        </span>
      </div>

      <div className="info-row">
        <FaUniversity className="icon" />
        <span>
          <strong>University:</strong> {candidate?.university || "--------"}
        </span>
      </div>
    </div>
  );
}

export default CandidateCard;