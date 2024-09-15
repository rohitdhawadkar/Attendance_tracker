import express from "express";
import auth from "../middleware/auth.js";
import {
  createLecture,
  getLecturesByDayForClass,
} from "../controller/lectureController.js";

const router = express.Router();

// POST route for adding a lecture (with authentication)
router.post("/addlecture", auth, createLecture);

// GET route for retrieving lectures by day for a specific class
router.get("/getlectureforday/:day/:classId", auth, getLecturesByDayForClass);

export default router;
