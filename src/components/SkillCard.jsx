import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "../styles/SkillCard.css";

function SkillCard({ candidate }) {

  const matchedSkills = candidate?.matched_skills || [];
  const missingSkills = candidate?.missing_skills || [];

  return (
    <div className="skills-container">

      <div className="skill-box">

        <h2>✅ Skills Found</h2>

        {matchedSkills.length > 0 ? (
          matchedSkills.map((skill, index) => (
            <p key={index}>
              <FaCheckCircle color="green" /> {skill}
            </p>
          ))
        ) : (
          <p>No skills found.</p>
        )}

      </div>

      <div className="skill-box">

        <h2>❌ Missing Skills</h2>

        {missingSkills.length > 0 ? (
          missingSkills.map((skill, index) => (
            <p key={index}>
              <FaTimesCircle color="red" /> {skill}
            </p>
          ))
        ) : (
          <p>No missing skills.</p>
        )}

      </div>

    </div>
  );
}

export default SkillCard;