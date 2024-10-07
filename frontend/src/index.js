import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Dashboard from "./Dashboard.js"; // Ensure Dashboard is properly defined
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateAccount from "./createAcoount";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/signup" element={<CreateAccount />} />
    </Routes>
  </Router>,
);
