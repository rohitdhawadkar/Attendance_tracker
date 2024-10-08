import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AttendanceDashboard from "./AttendanceDashboard"; // Ensure Dashboard is properly defined
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateAccount from "./createAccount";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/dashboard" element={<AttendanceDashboard />} />
      <Route path="/signup" element={<CreateAccount />} />
    </Routes>
  </Router>,
);
