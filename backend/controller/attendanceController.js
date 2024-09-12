import Attendance from "../models/attendance.js";

export const markAttendance = async (req, res) => {
  const { status } = req.body;

  try {
    const attendance = new Attendance({
      user: req.userId,
      status,
    });
    await attendance.save();

    res.status(201).json({ message: "Attendance marked successfully" });
  } catch (error) {
    console.error("Server error during attendance marking:", error);
    res.status(500).json({ message: "Server error during attendance marking" });
  }
};
