import { z } from "zod";
import Class from "../models/class.js";

const classSchema = z.object({
  className: z.string().min(1, "Class name is required"),
});

export const addClass = async (req, res) => {
  try {
    const { className } = classSchema.parse(req.body); // Validate the input

    const newClass = new Class({
      className,
    });

    await newClass.save();
    res.status(201).json(newClass);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    console.error("Error adding class:", error);
    res.status(500).json({ message: "Server error while adding class" });
  }
};

export default addClass;
