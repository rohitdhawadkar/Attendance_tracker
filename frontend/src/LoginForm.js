import React, { useState } from "react";
import axios from "axios";
import "./LoginForm.css";

const LoginForm = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/login",
        {
          username,
          password,
        },
        { withCredentials: true },
      );
      console.log("Login successful:", response.data);

      setSuccessMessage(`Login successful: Welcome ${response.data.username}`); // Set success message
      setErrorMessage(""); // Clear any previous errors
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Invalid username or password");
      setSuccessMessage(""); // Clear success message if login fails
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        {errorMessage && <p className="error">{errorMessage}</p>}{" "}
        {/* Show error message */}
        {successMessage && <p className="success">{successMessage}</p>}{" "}
        {/* Show success message */}
        <button type="submit" className="btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
