import React, { useState, useEffect } from "react";
import "./AttendanceDashboard.css";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

const AttendanceDashboard = () => {
  const [schedule, setSchedule] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeLecture, setActiveLecture] = useState(null);
  const [attendance, setAttendance] = useState({});
  const [showNoLecturesPopup, setShowNoLecturesPopup] = useState(false);
  const [selectedDay, setSelectedDay] = useState(getCurrentDay());

  const navigate = useNavigate();

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  function getCurrentDay() {
    const today = new Date();
    const options = { weekday: "long" };
    return today.toLocaleDateString("en-US", options);
  }

  useEffect(() => {
    fetchSchedule(selectedDay); // Fetch schedule when selected day changes
  }, [selectedDay]);

  const fetchSchedule = (day) => {
    const token = localStorage.getItem("token");
    const classId = localStorage.getItem("classId");

    if (token && classId) {
      axios
        .get(
          `http://localhost:3001/lectures/getlectureforday/${day}/${classId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((response) => {
          const fetchedSchedule = response.data;
          setSchedule(fetchedSchedule);

          if (fetchedSchedule.length === 0) {
            setShowNoLecturesPopup(true);
          } else {
            setShowNoLecturesPopup(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching attendance data:", error);
          if (error.response && error.response.status === 401) {
            navigate("/login");
          }
        });
    } else {
      console.error("Token or Class ID not found in local storage");
      navigate("/login");
    }
  };

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
          localStorage.removeItem("token");
          localStorage.removeItem("classId");
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

  const startSession = (index) => {
    setActiveLecture(index);
  };

  // Mark attendance and send to the backend
  const markAttendance = async (index, status) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId"); // Assuming user ID is stored in localStorage
    const lectureId = schedule[index]._id; // Get the lecture ID from the schedule

    // Update local attendance state
    setAttendance({ ...attendance, [index]: status });
    setActiveLecture(null);

    // Send attendance to the backend
    try {
      await axios.post(
        "http://localhost:3001/attendance/att",
        {
          lecture: lectureId,
          status: status,
          user: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(`Attendance marked as ${status} for lecture ${lectureId}`);
    } catch (error) {
      console.error("Error saving attendance:", error);
    }
  };

  const handleAddLecture = () => {
    setShowNoLecturesPopup(false);
    navigate("/add-lecture");
  };

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value); // Update the selected day
  };

  return (
    <div className="dashboard">
      <div className="header">
        <input type="text" placeholder="Search..." className="search-bar" />
        <div className="nav-icons">
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
        <h1>Today is {getCurrentDay()}</h1>

        {/* Dropdown to select day */}
        <div className="day-selector">
          <label htmlFor="day">Select Day:</label>
          <select
            id="day"
            value={selectedDay}
            onChange={handleDayChange}
            className="day-dropdown"
          >
            {daysOfWeek.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

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

        <div className="upcoming-card">
          <h2>Upcoming Lecture/Practical</h2>
          <div className="lecture-list">
            {schedule.map((lecture, index) => (
              <div key={index} className="lecture-item">
                <span className="subject">{lecture.subject}</span>
                <span className="time">{lecture.time}</span>

                {attendance[index] ? (
                  <span className="attendance-status">
                    {attendance[index] === "Present"
                      ? "✔️ Present"
                      : "❌ Absent"}
                  </span>
                ) : activeLecture === index ? (
                  <>
                    <button
                      className="attendance-btn"
                      onClick={() => markAttendance(index, "Present")}
                    >
                      Present
                    </button>
                    <button
                      className="attendance-btn"
                      onClick={() => markAttendance(index, "Absent")}
                    >
                      Absent
                    </button>
                  </>
                ) : (
                  <button
                    className="conduct-btn"
                    onClick={() => startSession(index)}
                  >
                    Conduct Session
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popup for no lectures */}
      {showNoLecturesPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>No Lectures Found</h3>
            <p>It looks like there are no lectures scheduled for today.</p>
            <button onClick={handleAddLecture} className="add-lecture-btn">
              Add Lecture
            </button>
            <button
              onClick={() => setShowNoLecturesPopup(false)}
              className="close-popup-btn"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceDashboard;
