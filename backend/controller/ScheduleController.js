import Schedule from "../models/schedule.js"; // Adjust the path
import Class from "../models/class.js";
import Lecture from "../models/lecture.js";

// Create a new schedule
export const createSchedule = async (req, res) => {
  try {
    const { classId, day, lectureIds } = req.body;

    // Check if the class exists
    const existingClass = await Class.findById(classId);
    if (!existingClass) {
      return res.status(404).json({ error: "Class not found" });
    }

    // Check if the lectures exist
    const existingLectures = await Lecture.find({ _id: { $in: lectureIds } });
    if (existingLectures.length !== lectureIds.length) {
      return res.status(404).json({ error: "One or more lectures not found" });
    }

    // Create a new schedule
    const newSchedule = new Schedule({
      class: classId,
      day,
      lectures: lectureIds,
    });

    // Save the schedule to the database
    await newSchedule.save();
    res.status(201).json(newSchedule);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create schedule", message: error.message });
  }
};

// Get all schedules
export const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find()
      .populate("class", "className") // Populate the class field with class details
      .populate("lectures", "subject time"); // Populate lectures with subject and time
    res.status(200).json(schedules);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to retrieve schedules", message: error.message });
  }
};
