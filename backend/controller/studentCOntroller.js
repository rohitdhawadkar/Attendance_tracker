import Student from "../models/Student.js";
import User from "../models/user.js";
import Class from "../models/class.js";

export const createStudent = async (req, res) => {
  const { name, classId, userId } = req.body;

  try {
    const foundClass = await Class.findById(classId);
    const foundUser = await User.findById(userId);

    if (!foundClass || !foundUser) {
      return res.status(404).json({ message: "Class or User not found" });
    }

    const newStudent = new Student({
      name,
      class: classId,
      user: userId,
    });

    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default createStudent;
