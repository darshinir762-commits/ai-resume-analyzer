import { useState } from "react";
import api from "../services/api";

function Login({ setLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      alert(response.data.message);
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("user", JSON.stringify(response.data.user));

setLoggedIn(true);
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;