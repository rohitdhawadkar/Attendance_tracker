import mongoose from "mongoose";
import Class from "./classSchema.js";
const lectureSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  dayOfWeek: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
});

const Lecture = mongoose.model("Lecture", lectureSchema);
export default Lecture;
