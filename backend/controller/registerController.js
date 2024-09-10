import express from "express";
import bcrypt from "bcrypt";
import { z } from "zod";
import student from "../models/user.js"; // Ensure this matches your model export

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await student.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newStudent = new student({
      username, // This is equivalent to username: username
      password: hashedPassword, // Hashed password
    });

    // Save the user to the database
    await newStudent.save();

    // Respond with success message
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    // Handle Zod validation error
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }

    // Handle other errors
    console.error("Server error during registration:", error);
    return res
      .status(500)
      .json({ message: "Server error. Could not register user." });
  }
};

export default registerUser;
