import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import User from "../models/user.js"; // Ensure correct import

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const CurrentUser = await User.findOne({ username }).populate("class");
    if (!CurrentUser) {
      return res.status(404).json({ msg: "User not found" }); // Changed to 404
    }

    // Extract classId if the user has a class associated
    const classId = CurrentUser.class ? CurrentUser.class._id : null;

    // Compare passwords
    const isMatch = await bcrypt.compare(password, CurrentUser.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid password" }); // Changed to 401
    }

    // Generate JWT token
    const generateToken = (username, classId) => {
      return jwt.sign({ username, classId }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
    };

    const token = generateToken(CurrentUser.username, classId);

    // Send response without setting a cookie
    return res.status(200).json({
      msg: "Login successful",
      classId, // Return classId if available
      token, // Send the token in the response
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }

    res.status(500).json({ message: "Server error" });
  }
};

export default login;
