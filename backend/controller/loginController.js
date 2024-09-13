import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import user from "../models/user.js";
import { z } from "zod";
import student from "../models/user.js";

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const User = await user.findOne({ username });

    if (!User) {
      return res.status(200).json({ msg: "user not found" });
    }

    const isMatch = await bcrypt.compare(password, User.password);

    if (!isMatch) {
      return res.status(200).json({ msg: "invalid password" });
    }

    // const generateToken = (username) => {
    //   return jwt.sign({ username: username }, process.env.JWT_SECRET, {
    //     expiresIn: "1h",
    //   });
    // };
    const generateToken = (student) => {
      return jwt.sign({ username: username }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
    };
    // Example in the login or registration controller
    const token = generateToken(user.username); // Assuming `user` is the logged-in or registered user object

    return res.status(200).json({ token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }

    res.status(500).json({ message: "Server error" });
  }
};

export default login;
