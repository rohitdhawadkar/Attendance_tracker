import Student from "../models/Student";
import auth from "../middleware/auth";
import createStudent from "../controller/studentCOntroller";
import express from "express";

const router = express.Router();

router.post("/addStudent", auth, createStudent);

export default router;
