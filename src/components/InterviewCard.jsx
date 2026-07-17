import { FaQuestionCircle } from "react-icons/fa";
import "../styles/InterviewCard.css";

function InterviewCard({ questions }) {
  return (
    <div className="interview-card">
      <h2>
        <FaQuestionCircle className="icon" /> AI Interview Questions
      </h2>

      {questions && questions.length > 0 ? (
        <ol className="question-list">
          {questions.map((question, index) => (
            <li key={index}>
              {question}
            </li>
          ))}
        </ol>
      ) : (
        <p className="empty-text">
          Upload a resume to generate interview questions.
        </p>
      )}
    </div>
  );
}

export default InterviewCard;