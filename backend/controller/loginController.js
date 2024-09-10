import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import user from "../models/user.js";
import { z } from "zod";

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

    const payload = {
      username: User.username,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }

    res.status(500).json({ message: "Server error" });
  }
};

export default login;
