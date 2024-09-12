import mongoose from "moongoose";
import student from "./user";

const classSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
    required: true,
  },
  lectures: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lecture",
    },
  ],
});

const Class = mongoose.model("Class", classSchema);
export default Class;
