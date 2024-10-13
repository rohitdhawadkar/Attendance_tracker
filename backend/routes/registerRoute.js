import express from "express";
import registerUser from "../controller/registerController.js";
import registerSchema from "../validations/registerSchema.js";
import v from "../middleware/validation.js";

const router = express.Router();

router.post("/register", registerUser);

export default router;
