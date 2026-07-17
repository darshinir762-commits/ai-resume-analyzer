import "./../styles/Header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        🤖 AI Resume Analyzer
      </div>

      <nav>
        <ul>
          <li>Dashboard</li>
          <li>Resume</li>
          <li>ATS Score</li>
          <li>Interview</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;