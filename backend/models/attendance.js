import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    lecture: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lecture", // Reference to the Lecture model
      required: true,
    },
    status: {
      type: String,
      enum: ["Present", "Absent"], // Only allows 'Present' or 'Absent'
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student", // Reference to the Student model
      required: true,
    },
  },
  { timestamps: true },
); // Adds createdAt and updatedAt fields

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
