import express from "express";
import auth from "../middleware/auth.js";
import {
  createLecture,
  getLecturesByDayForClass,
  updateLecture,
  deleteLecture

} from "../controller/lectureController.js";
import v from "../middleware/validation.js";
import LectureSchemaValidation from "../validations/lectureSchema.js"

const router = express.Router();

router.post("/addlecture", auth,v(LectureSchemaValidation), createLecture);

router.get("/getlectureforday/:day/:classId", auth, getLecturesByDayForClass);

router.put("updateLecture/:id",auth,updateLecture);

router.delete("deleteLecture/:id",auth,deleteLecture);

export default router;
