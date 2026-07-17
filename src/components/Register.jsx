import { useState } from "react";
import api from "../services/api";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {

    try {

      const response = await api.post("/register", {
        name,
        email,
        password,
      });

      alert(response.data.message);

    } catch (err) {

      alert("Registration failed");

    }

  };

  return (

    <div className="auth-container">

      <h2>Create Account</h2>

      <input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

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

      <button onClick={handleRegister}>
        Register
      </button>

    </div>

  );
}

export default Register;