import Class from "../models/class.js";

export const addClass = async (req, res) => {
  const { className } = req.body;
  console.log("User ID from req:", req.userId);

  try {
    const newClass = new Class({
      className,
      student: req.userId,
    });

    await newClass.save();
    res.status(201).json({ message: "Class added successfully" });
  } catch (error) {
    console.error("Error adding class:", error);
    res.status(500).json({ message: "Server error while adding class" });
  }
};

export default addClass;
