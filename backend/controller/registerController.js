import bcrypt from "bcrypt";
import { z } from "zod";
import User from "../models/user.js";
import Class from "../models/class.js"; // Make sure to import the Class model
import registerSchema from "../validations/registerSchema.js"; // Import your validation schema

const registerUser = async (req, res) => {
  try {
    // Validate the request body against the schema
    const parsedBody = registerSchema.parse(req.body);
    const { username, password, classId } = parsedBody; // Update to classId

    // Check if the class exists
    const existingClass = await Class.findById(classId);
    if (!existingClass) {
      return res.status(400).json({ msg: "Class does not exist." });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists." });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with the class reference
    const newUser = new User({
      username,
      password: hashedPassword,
      class: classId, // Use the updated classId
    });

    await newUser.save();

    return res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }

    console.error("Server error during registration:", error);
    return res
      .status(500)
      .json({ message: "Server error. Could not register user." });
  }
};

export default registerUser;
