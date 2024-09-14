import Attendance from "../models/attendance.js";
import Lecture from "../models/lecture.js";
import Student from "../models/Student.js";

// Create a new attendance record
export const createAttendance = async (req, res) => {
  try {
    const { lectureId, studentId, status } = req.body;

    // Check if the lecture exists
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({ error: "Lecture not found" });
    }

    // Check if the student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Create the attendance record
    const newAttendance = new Attendance({
      lecture: lectureId,
      student: studentId,
      status,
    });

    // Save to the database
    await newAttendance.save();
    res.status(201).json(newAttendance);
  } catch (error) {
    res.status(500).json({
      error: "Failed to create attendance record",
      message: error.message,
    });
  }
};
