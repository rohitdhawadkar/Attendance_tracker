import express from "express";
import {
  createAttendance,
  getAllAttendance,
  getAttendanceByLecture,
  getAttendanceByStudent,
  updateAttendance,
  deleteAttendance,
} from "../controller/AttendanceController.js";

import auth from "../middleware/auth.js";
import attendanceSchema from "../validations/attendanceSchema.js";
import v from "../middleware/validation.js";

const router = express.Router();

router.post("/", auth,v(attendanceSchema), createAttendance);

router.get("/", getAllAttendance);

router.get("/lecture/:lectureId", getAttendanceByLecture);

router.get("/student/:studentId", getAttendanceByStudent);

router.put("/:id", updateAttendance);

router.delete("/:id", deleteAttendance);

export default router;
