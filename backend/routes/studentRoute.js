
import auth from "../middleware/auth.js";
import {createStudent,
    updateStudent,
    deleteStudent
} from "../controller/studentController.js";
import express from "express";
import StudentValidation from "../validations/StudentValidation.js";
import v from "../middleware/validation.js";

const router = express.Router();

router.post("/createStudent", auth,v(StudentValidation), createStudent);
router.put("/updateStudent/:id",auth,updateStudent);
router.delete("/deleteStudent/:id",auth,deleteStudent);


export default router;
