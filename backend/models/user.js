import mongoose from "mongoose";
const studentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },
});

const student = mongoose.model("students", studentSchema);

export default student;
