import React, { useState } from "react";
import axios from "axios";

const AddSubject = () => {
  const storedClassId = localStorage.getItem("classId"); // Retrieve classId from localStorage

  const [subjectData, setSubjectData] = useState({
    name: "",
    code: "",
    description: "",
    classId: storedClassId || "", // Initialize classId from localStorage or set as an empty string
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/Subjects/subjects",
        subjectData,
      );
      setMessage(response.data.message);
      setSubjectData({
        name: "",
        code: "",
        description: "",
        classId: storedClassId,
      }); // Clear form but retain classId
    } catch (error) {
      setMessage(error.response?.data?.message || "Error adding subject");
    }
  };

  return (
    <div className="add-subject-container">
      <h2>Add New Subject</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Subject Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={subjectData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="code">Subject Code:</label>
          <input
            type="text"
            id="code"
            name="code"
            value={subjectData.code}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={subjectData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="classId">Class ID:</label>
          <input
            type="text"
            id="classId"
            name="classId"
            value={subjectData.classId}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Subject</button>
      </form>
    </div>
  );
};

export default AddSubject;
