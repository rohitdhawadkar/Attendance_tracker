import Lecture from "../models/lecture.js";
import Class from "../models/class.js";
import mongoose from "mongoose";

export const createLecture = async (req, res) => {
  try {
    const { subject, classId, fromTime, toTime, day } = req.body;

    const existingClass = await Class.findById(classId);
    if (!existingClass) {
      return res.status(404).json({ error: "Class not found" });
    }

    const newLecture = new Lecture({
      subject,
      class: classId,
      fromTime,
      toTime,
      day,
    });

    await newLecture.save();
    res.status(201).json(newLecture);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create lecture", message: error.message });
  }
};

export const getLecturesByDayForClass = async (req, res) => {
  try {
    const { day, classId } = req.params;
    const trimmedClassId = classId.trim();

    console.log(`Received day: ${day}`);
    console.log(`Received classId: ${trimmedClassId}`);

    const validDays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    if (!validDays.includes(day)) {
      return res
        .status(400)
        .json({ error: "Invalid day. Use full weekday names." });
    }

    if (!mongoose.isValidObjectId(trimmedClassId)) {
      return res.status(400).json({ error: "Invalid classId format" });
    }

    const existingClass = await Class.findById(trimmedClassId);
    if (!existingClass) {
      return res.status(404).json({ error: "Class not found" });
    }

    const lectures = await Lecture.find({ day, class: trimmedClassId });

    if (lectures.length === 0) {
      return res.status(404).json({
        message: `No lectures found for class ${trimmedClassId} on ${day}`,
      });
    }

    res.status(200).json(lectures);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to retrieve lectures", message: error.message });
  }
};
