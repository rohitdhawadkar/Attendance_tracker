import mongoose from "mongoose";
import student from "./user";

const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["present", "absent"],
    required: true,
  },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
