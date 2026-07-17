import { useState, useEffect } from "react";
import "./App.css";

import Header from "./components/Header";
import UploadSection from "./components/UploadSection";
import CandidateCard from "./components/CandidateCard";
import ATSCard from "./components/ATSCard";
import SkillCard from "./components/SkillCard";
import JobMatchCard from "./components/JobMatchCard";
import SuggestionCard from "./components/SuggestionCard";
import InterviewCard from "./components/InterviewCard";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import History from "./components/History";

import generatePDF from "./utils/generatePDF";

function App() {
 const [candidate, setCandidate] = useState(null);
 const [loggedIn, setLoggedIn] = useState(false);

useEffect(() => {
  const status = localStorage.getItem("loggedIn");

  if (status === "true") {
    setLoggedIn(true);
  }
}, []);
  const [showLogin, setShowLogin] = useState(true);

  if (!loggedIn) {
    return (
      <div className="app">

        <Header />

        {showLogin ? (
          <>
            <Login setLoggedIn={setLoggedIn} />

            <p style={{ textAlign: "center", marginTop: "20px" }}>
              Don't have an account?{" "}
              <button onClick={() => setShowLogin(false)}>
                Register
              </button>
            </p>
          </>
        ) : (
          <>
            <Register />

            <p style={{ textAlign: "center", marginTop: "20px" }}>
              Already have an account?{" "}
              <button onClick={() => setShowLogin(true)}>
                Login
              </button>
            </p>
          </>
        )}

      </div>
    );
  }

  return (
    <div className="app">

      <Header />
      <div
  style={{
    textAlign: "right",
    margin: "20px"
  }}
>
  <button
    onClick={() => {
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("user");
      setLoggedIn(false);
    }}
    style={{
      padding: "10px 20px",
      background: "#dc2626",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer"
    }}
  >
    Logout
  </button>
</div>
      <Dashboard />

      <UploadSection setCandidate={setCandidate} />
      <History />

      <CandidateCard candidate={candidate} />

      <ATSCard candidate={candidate} />

      <SkillCard candidate={candidate} />

      <JobMatchCard candidate={candidate} />

      <SuggestionCard suggestions={candidate?.suggestions} />

      <InterviewCard questions={candidate?.interview_questions} />

      {candidate && (
        <div
          style={{
            textAlign: "center",
            margin: "30px 0",
          }}
        >
          <button
            onClick={() => generatePDF(candidate)}
            style={{
              padding: "15px 30px",
              background: "#4338ca",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            📄 Download PDF Report
          </button>
        </div>
      )}

      <Footer />

    </div>
  );
}

export default App;