import Attendance from "../models/attendance.js";
import Lecture from "../models/lecture.js";
import Student from "../models/Student.js";

export const createAttendance = async (req, res) => {
  try {
    const { lectureId, studentId, status } = req.body;

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({ error: "Lecture not found" });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const newAttendance = new Attendance({
      lecture: lectureId,
      student: studentId,
      status,
    });

    await newAttendance.save();
    res.status(201).json(newAttendance);
  } catch (error) {
    res.status(500).json({
      error: "Failed to create attendance record",
      message: error.message,
    });
  }
};

export const getAllAttendance = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find()
      .populate("lecture", "subject time")
      .populate("student", "name");
    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({
      error: "Failed to retrieve attendance records",
      message: error.message,
    });
  }
};

export const getAttendanceByLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const attendanceRecords = await Attendance.find({ lecture: lectureId })
      .populate("lecture", "subject time")
      .populate("student", "name");

    if (!attendanceRecords.length) {
      return res
        .status(404)
        .json({ error: "No attendance records found for this lecture" });
    }

    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({
      error: "Failed to retrieve attendance records",
      message: error.message,
    });
  }
};

export const getAttendanceByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const attendanceRecords = await Attendance.find({ student: studentId })
      .populate("lecture", "subject time")
      .populate("student", "name");

    if (!attendanceRecords.length) {
      return res
        .status(404)
        .json({ error: "No attendance records found for this student" });
    }

    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({
      error: "Failed to retrieve attendance records",
      message: error.message,
    });
  }
};

export const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedAttendance = await Attendance.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true },
    );

    if (!updatedAttendance) {
      return res.status(404).json({ error: "Attendance record not found" });
    }

    res.status(200).json(updatedAttendance);
  } catch (error) {
    res.status(500).json({
      error: "Failed to update attendance record",
      message: error.message,
    });
  }
};

export const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAttendance = await Attendance.findByIdAndDelete(id);

    if (!deletedAttendance) {
      return res.status(404).json({ error: "Attendance record not found" });
    }

    res.status(200).json({ message: "Attendance record deleted successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete attendance record",
      message: error.message,
    });
  }
};
