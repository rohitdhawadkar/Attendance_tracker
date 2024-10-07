import React, { useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });

      if (response.data.msg === "Login successful") {
        setMessage("Logged in successfully!");

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        setMessage(response.data.message || "Incorrect username or password");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <p className="login-subtitle">
          Enter your credentials to access your account
        </p>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            className="login-input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            className="login-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className="login-button"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
        {message && (
          <p
            className={`login-message ${
              message === "Logged in successfully!" ? "success" : "error"
            }`}
          >
            {message}
          </p>
        )}
        <p className="signup-text">
          Don’t have an account?{" "}
          <span className="signup-link" onClick={handleSignupClick}>
            <b>
              <u>Sign Up</u>
            </b>
          </span>
        </p>
      </div>
    </div>
  );
}

export default App;
