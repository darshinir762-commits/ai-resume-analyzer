import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/History.css";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return;

    api
      .get(`/history/${user.id}`)
      .then((res) => {
        setHistory(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="history-container">
      <h2>📄 Resume History</h2>

      {history.length === 0 ? (
        <p>No resumes analyzed yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Resume</th>
              <th>ATS Score</th>
              <th>Upload Date</th>
            </tr>
          </thead>

          <tbody>
            {history.map((item) => (
              <tr key={item.id}>
                <td>{item.filename}</td>
                <td>{item.ats_score}%</td>
                <td>{item.uploaded_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default History;