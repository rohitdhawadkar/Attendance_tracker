import Class from "../models/Class.js";
import Lecture from "../models/Lecture.js";

export const addClass = async (req, res) => {
  const { className } = req.body;

  try {
    const newClass = new Class({
      className,
      user: req.userId, // User who is adding the class
    });

    await newClass.save();
    res.status(201).json({ message: "Class added successfully" });
  } catch (error) {
    console.error("Error adding class:", error);
    res.status(500).json({ message: "Server error while adding class" });
  }
};
