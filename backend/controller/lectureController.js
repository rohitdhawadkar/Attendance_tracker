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

    // Return empty array if no lectures found
    res.status(200).json(lectures.length ? lectures : []);
  } catch (error) {
    console.error("Error retrieving lectures:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve lectures", message: error.message });
  }
};

export const updateLecture = async (req, res) => {
  try {
    const lectureId = req.params.id;
    const { subject, classId, time } = req.body;

    const existingClass = await Class.findById(classId);
    if (!existingClass) {
      return res.status(404).json({ error: "Class not found" });
    }

    const updatedLecture = await Lecture.findByIdAndUpdate(
      lectureId,
      { subject, class: classId, time },
      { new: true, runValidators: true },
    );

    if (!updatedLecture) {
      return res.status(404).json({ error: "Lecture not found" });
    }

    res.status(200).json(updatedLecture);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update lecture", message: error.message });
  }
};

export const deleteLecture = async (req, res) => {
  try {
    const lectureId = req.params.id;
    const deletedLecture = await Lecture.findByIdAndDelete(lectureId);

    if (!deletedLecture) {
      return res.status(404).json({ error: "Lecture not found" });
    }

    res.status(200).json({ message: "Lecture deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete lecture", message: error.message });
  }
};
