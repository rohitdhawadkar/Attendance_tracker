import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { z } from "zod";
import User from "../models/user.js";

const login = async (req, res) => {
  console.log(1);
  try {
    const { username, password } = req.body;
    console.log(1);
    const CurrentUser = await User.findOne({ username });
    console.log(1);

    if (!CurrentUser) {
      return res.status(200).json({ msg: "user not found" });
    }
    console.log(1);

    const isMatch = await bcrypt.compare(password, CurrentUser.password);
    console.log(1);
    if (!isMatch) {
      return res.status(200).json({ msg: "invalid password" });
    }
    console.log(1);

    const generateToken = (User) => {
      return jwt.sign({ username: username }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
    };
    console.log(1);
    // Example in the login or registration controller
    const token = generateToken(User.username);
    console.log(1); // Assuming `user` is the logged-in or registered user object

    return res.status(200).json({ token });
    console.log(1);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }

    res.status(500).json({ message: "Server error" });
  }
};

export default login;
