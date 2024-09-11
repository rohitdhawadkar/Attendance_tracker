import express from "express";
import bcrypt from "bcrypt";
import { z } from "zod";
import student from "../models/user.js";

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await student.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newStudent = new student({
      username,
      password: hashedPassword,
    });

    await newStudent.save();

    return res.status(201).json({ message: "User registered successfully" });
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