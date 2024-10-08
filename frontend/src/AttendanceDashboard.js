import React, { useState, useEffect } from "react";
import "./AttendanceDashboard.css";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

const AttendanceDashboard = () => {
  const [schedule, setSchedule] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false); // State to toggle dropdown

  const navigate = useNavigate();
  useEffect(() => {
    const fetchedSchedule = [
      { subject: "Operating System", time: "10:00 am" },
      { subject: "Database Management System", time: "11:00 am" },
      { subject: "Cloud Computing", time: "01:45 am" },
      { subject: "Computer Architecture", time: "02:45 am" },
      { subject: "Computer Networks", time: "03:00 am" },
      { subject: "Cloud Computing", time: "10:00 am" },
    ];
    setSchedule(fetchedSchedule);
  }, []);

  const chartData = {
    labels: ["Theory", "Practical"],
    datasets: [
      {
        data: [70, 30],
        backgroundColor: ["#374151", "#3b82f6"],
      },
    ],
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const handleLogout = () => {
    axios
      .post("/logout", {}, { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          console.log("Logged out successfully");

          setTimeout(() => {
            navigate("/login");
          }, 1000);
        } else {
          console.error("Logout failed");
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  return (
    <div className="dashboard">
      {/* Header with search and icons */}
      <div className="header">
        <input type="text" placeholder="Search..." className="search-bar" />
        <div className="nav-icons">
          {/* Profile Text instead of Icon */}
          <div className="profile-container">
            <span onClick={toggleDropdown} style={{ cursor: "pointer" }}>
              Profile
            </span>
            {showDropdown && (
              <div className="dropdown-menu">
                <div className="dropdown-item">Profile</div>
                <div className="dropdown-item">Settings</div>
                <div className="dropdown-item" onClick={handleLogout}>
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="content">
        {/* Attendance Card */}
        <div className="attendance-card">
          <h2>Current Attendance</h2>
          <button className="total-btn">Total</button>
          <div className="attendance-chart">
            <Doughnut data={chartData} />
          </div>
          <div className="chart-legend">
            <span>
              <span className="legend-color theory-color"></span>Theory
            </span>
            <span>
              <span className="legend-color practical-color"></span>Practical
            </span>
          </div>
        </div>

        {/* Upcoming Lectures Card */}
        <div className="upcoming-card">
          <h2>Upcoming Lecture/Practical</h2>
          <div className="lecture-list">
            {schedule.map((lecture, index) => (
              <div key={index} className="lecture-item">
                <span className="subject">{lecture.subject}</span>
                <span className="time">{lecture.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceDashboard;
