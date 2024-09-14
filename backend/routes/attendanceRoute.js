import express from "express";
import markAttendance from "../controller/attendanceController.js";
import attendanceSchema from "../validations/attendanceSchema.js";
import auth from "../middleware/auth.js";
import v from "../middleware/validation.js";

const router = express.Router();

router.post("/markAttendance", auth, v(attendanceSchema), markAttendance);

export default router;
