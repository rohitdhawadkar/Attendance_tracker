import mongoose from "mongoose";
import Class from "./classSchema.js";
const lectureSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  class: {
    type: mongoose.Schema.Types.ObjectId, // Use ObjectId to reference another model
    ref: "Class", // Reference the Class model
    required: true,
  },
  time: {
    type: String,
    required: true,
    match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, // Enforces 'HH:mm' format (24-hour time)
  },
});

const Lecture = mongoose.model("Lecture", lectureSchema);
export default Lecture;
