import React, { useState } from "react";
import axios from "axios";
import "./CreateAccount.css";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [className, setClassName] = useState(""); // State for class input
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const classResponse = await axios.post("http://localhost:3001/addclass", {
        className,
      });

      const classId = classResponse.data._id;

      // Step 3: Create the user with the class ID
      const response = await axios.post("http://localhost:3001/register", {
        username,
        password,
        classId, // Use the newly created class ID
      });

      setMessage(response.data.msg || "Account created successfully!");
      navigate("/");
    } catch (error) {
      if (error.response) {
        setMessage(
          error.response.data.msg ||
            "An error occurred while creating the account.",
        );
      } else if (error.request) {
        setMessage("No response from the server. Please try again later.");
      } else {
        setMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-account-container">
      <div className="form-box">
        <h1 className="create-Account-Text">Create an account</h1>
        <p>Create an account to view and track your attendance</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username" className="us">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password" className="ps">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label htmlFor="class" className="class-label">
            Class
          </label>
          <input
            type="text"
            id="class"
            name="classInput" // Changed name to classInput
            placeholder="Enter your class"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
          />

          <div className="password-guidelines">
            <ul>
              <li>Use 8 or more characters</li>
              <li>Use a number (e.g., 1,2,3,4)</li>
              <li>Use Upper and Lower case letters (e.g., Aa)</li>
              <li>Use Symbols (e.g., !@#$)</li>
            </ul>
          </div>

          <button type="submit" className="sign-in-btn" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Sign up"}
          </button>
        </form>
        {message && <p className="message">{message}</p>}
        <p className="terms">
          By creating an account, you agree to the{" "}
          <a href="/terms">terms of use</a> and{" "}
          <a href="/privacy">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default CreateAccount;
