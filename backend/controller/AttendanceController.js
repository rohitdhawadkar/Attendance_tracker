import Attendance from "../models/attendance.js";
import Lecture from "../models/lecture.js";

import User from "../models/user.js";

export const createAttendance = async (req, res) => {
  try {
    const { lectureId, UserId, status } = req.body;

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({ error: "Lecture not found" });
    }

    const user = await User.findById(UserId);
    if (!user) {
      return res.status(404).json({ error: "Student not found" });
    }

    const newAttendance = new Attendance({
      lecture: lectureId,
      User: UserId,
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
    const { UserId } = req.params;
    const attendanceRecords = await Attendance.find({ student: UserId })
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
