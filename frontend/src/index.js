import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AddLecture from "./AddLecture";
import AttendanceDashboard from "./AttendanceDashboard"; // Ensure Dashboard is properly defined
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateAccount from "./createAccount";
import AddSubject from "./AddSubject";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/dashboard" element={<AttendanceDashboard />} />
      <Route path="/signup" element={<CreateAccount />} />
      <Route path="/add-lecture" element={<AddLecture />} />
      <Route path="/add-subject" element={<AddSubject />} />
    </Routes>
  </Router>,
);
