import express from "express";
import addLecture from "../controller/lectureController.js";
import auth from "../middleware/auth.js";
import v from "../middleware/validation.js";
import lectureSchema from "../validations/lectureSchema.js";

const router = express.Router();

router.post("/addlectuer", auth, v(lectureSchema), addLecture);

export default router;
