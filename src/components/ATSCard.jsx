import "../styles/ATSCard.css";

function ATSCard({ candidate }) {

  const atsScore = candidate?.ats_score || 0;

  return (
    <div className="ats-card">

      <h2>ATS Resume Score</h2>

      <div className="score-circle">
        {atsScore}%
      </div>

      <div className="progress-container">

        <div
          className="progress-bar"
          style={{ width: `${atsScore}%` }}
        ></div>

      </div>

      <p className="score-text">
        {atsScore >= 80
          ? "Excellent Resume ✅"
          : atsScore >= 60
          ? "Good Resume 👍"
          : "Needs Improvement ⚠️"}
      </p>

    </div>
  );
}

export default ATSCard;