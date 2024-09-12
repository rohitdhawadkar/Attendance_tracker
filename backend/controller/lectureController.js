import Class from "../models/Class";

export const addLecture = async (req, res) => {
  const { classId, topic, dayOfWeek, time } = req.body;

  try {
    const classObject = await Class.findById(classId);
    if (!classObject) {
      return res.status(404).json({ message: "Class not found" });
    }

    const newLecture = new Lecture({
      topic,
      dayOfWeek,
      time,
      class: classId,
    });

    await newLecture.save();

    classObject.lectures.push(newLecture._id);
    await classObject.save();

    res.status(201).json({ message: "Lecture added successfully" });
  } catch (error) {
    console.error("Error adding lecture:", error);
    res.status(500).json({ message: "Server error while adding lecture" });
  }
};
