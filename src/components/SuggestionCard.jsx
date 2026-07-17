import { FaLightbulb } from "react-icons/fa";
import "../styles/SuggestionCard.css";

function SuggestionCard({ suggestions }) {
  return (
    <div className="suggestion-card">
      <h2>
        <FaLightbulb className="icon" /> AI Suggestions
      </h2>

      {suggestions && suggestions.length > 0 ? (
        <ul className="suggestion-list">
          {suggestions.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="empty-text">No suggestions available.</p>
      )}
    </div>
  );
}

export default SuggestionCard;