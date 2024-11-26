import React, { useEffect, useState } from "react";
import axios from "axios";

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch attendance data from the backend API
    const fetchAttendance = async () => {
      try {
        const response = await axios.get("/api/attendance"); // Replace with your actual API URL
        setAttendanceData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching attendance data");
        setLoading(false);
      }
    };
    fetchAttendance();
  }, []);

  // Calculate attendance percentage
  const calculatePercentage = (attendedLectures, totalLectures) => {
    if (totalLectures === 0) return "N/A";
    return ((attendedLectures / totalLectures) * 100).toFixed(2) + "%";
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>User Attendance by Subject</h2>
      <table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Total Lectures</th>
            <th>Attended Lectures</th>
            <th>Attendance Percentage</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((subject, index) => (
            <tr key={index}>
              <td>{subject.subject}</td>
              <td>{subject.totalLectures}</td>
              <td>{subject.attendedLectures}</td>
              <td>
                {calculatePercentage(
                  subject.attendedLectures,
                  subject.totalLectures,
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
