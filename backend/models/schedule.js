import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class", // Reference to the Class model
    required: true,
  },
  day: {
    type: String, // String for the day of the week
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ], // Valid days
    required: true,
  },
  lectures: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lecture", // Reference to the Lecture model
      required: true,
    },
  ],
});

const Schedule = mongoose.model("Schedule", scheduleSchema);
export default Schedule;
