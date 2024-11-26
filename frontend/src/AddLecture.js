import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddLecture.css";

const token = localStorage.getItem("token");

const AddLecture = () => {
  const [lecture, setLecture] = useState({
    subject: "",
    classId: "", // Will be prefilled with classId from localStorage
    fromTime: "",
    toTime: "",
    day: "",
  });

  const [subjects, setSubjects] = useState([]); // Initialize with empty array
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/Subjects/subjects",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setSubjects(response.data); // Assuming response.data is an array of subjects
      } catch (error) {
        console.error("Error fetching subjects:", error);
        setErrorMessage("Failed to load subjects.");
      }
    };

    const storedClassId = localStorage.getItem("classId");
    if (storedClassId) {
      setLecture((prevLecture) => ({ ...prevLecture, classId: storedClassId }));
    }

    fetchSubjects();
  }, []); // Fetch subjects only once when the component mounts

  const handleChange = (e) => {
    setLecture({ ...lecture, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/lectures/addlecture",
        lecture,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log("Lecture added successfully:", response.data);
      setErrorMessage("");
      // Optionally, clear the form or redirect the user
    } catch (error) {
      console.error("Error adding lecture:", error);
      setErrorMessage("Failed to add lecture. Please check your input.");
    }
  };

  return (
    <div className="add-lecture-container">
      <h2>Add Lecture</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <select
            id="subject"
            name="subject"
            value={lecture.subject}
            onChange={handleChange}
            required
          >
            <option value="">Select Subject</option>
            {subjects.length > 0 ? (
              subjects.map((subject) => (
                <option key={subject._id} value={subject._id}>
                  {subject.name}
                </option>
              ))
            ) : (
              <option disabled>Loading subjects...</option>
            )}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="classId">Class ID</label>
          <input
            type="text"
            id="classId"
            name="classId"
            value={lecture.classId}
            readOnly
          />
        </div>

        <div className="form-group">
          <label htmlFor="fromTime">From Time (HH:MM)</label>
          <input
            type="time"
            id="fromTime"
            name="fromTime"
            value={lecture.fromTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="toTime">To Time (HH:MM)</label>
          <input
            type="time"
            id="toTime"
            name="toTime"
            value={lecture.toTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="day">Day</label>
          <select
            id="day"
            name="day"
            value={lecture.day}
            onChange={handleChange}
            required
          >
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </div>

        <button className="btn" type="submit">
          Add Lecture
        </button>
      </form>
    </div>
  );
};

export default AddLecture;
