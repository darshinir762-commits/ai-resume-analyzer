import "../styles/Dashboard.css";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="dashboard">

      <h1>👋 Welcome, {user?.name}</h1>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h2>📄 Resume Analyzer</h2>
          <p>AI-powered ATS resume analysis.</p>
        </div>

        <div className="dashboard-card">
          <h2>🎯 ATS Score</h2>
          <p>Analyze ATS compatibility.</p>
        </div>

        <div className="dashboard-card">
          <h2>🤖 AI Interview</h2>
          <p>Generate interview questions.</p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;