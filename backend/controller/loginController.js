import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import User from "../models/user.js"; // Ensure correct import

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const CurrentUser = await User.findOne({ username });
    if (!CurrentUser) {
      return res.status(200).json({ msg: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, CurrentUser.password);
    if (!isMatch) {
      return res.status(200).json({ msg: "Invalid password" });
    }

    // Generate JWT token
    const generateToken = (username) => {
      return jwt.sign({ username }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
    };

    const token = generateToken(CurrentUser.username);

    // Setting the cookie with the generated token
    return res
      .cookie("token", token, {
        // Corrected from jwtToken to token
        httpOnly: true, // Not accessible by JavaScript
        secure: true, // Only sent over HTTPS
        sameSite: "Strict", // Prevent CSRF
        maxAge: 3600000, // 1 hour expiration
      })
      .status(200)
      .json({ msg: "Login successful" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }

    res.status(500).json({ message: "Server error" });
  }
};

export default login;
