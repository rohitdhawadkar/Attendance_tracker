import Lecture from "../models/lecture.js"; // Adjust the path as necessary
import Class from "../models/class.js";

// Create a new lecture
export const createLecture = async (req, res) => {
  try {
    const { subject, classId, time } = req.body;

    // Check if the class exists
    const existingClass = await Class.findById(classId);
    if (!existingClass) {
      return res.status(404).json({ error: "Class not found" });
    }

    // Create a new lecture
    const newLecture = new Lecture({
      subject,
      class: classId,
      time,
    });

    // Save the lecture to the database
    await newLecture.save();
    res.status(201).json(newLecture);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create lecture", message: error.message });
  }
};
