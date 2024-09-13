import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true,
  },
});

const Class = mongoose.model("Class", classSchema);
export default Class;

// lectures: [
//   {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: Lecture,
//   },
// ],
