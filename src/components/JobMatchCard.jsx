import "../styles/JobMatchCard.css";

function JobMatchCard({ candidate }) {

  const atsScore = candidate?.ats_score || 0;
  const jobMatch = candidate?.job_match || 0;

  return (
    <div className="jobmatch-card">

      <h2>🎯 Job Match Analysis</h2>

      <div className="progress-group">
        <p>Overall Match</p>

        <div className="progress">
          <div
            className="progress-fill"
            style={{ width: `${jobMatch}%` }}
          ></div>
        </div>

        <span>{jobMatch}%</span>
      </div>

      <div className="progress-group">
        <p>ATS Resume Score</p>

        <div className="progress">
          <div
            className="progress-fill"
            style={{ width: `${atsScore}%` }}
          ></div>
        </div>

        <span>{atsScore}%</span>
      </div>

    </div>
  );
}

export default JobMatchCard;