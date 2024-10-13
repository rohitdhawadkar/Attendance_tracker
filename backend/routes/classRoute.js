import express from "express";
import auth from "../middleware/auth.js";
import addClass from "../controller/classController.js";

import v from "../middleware/validation.js";
import classValidation from "../validations/ClassValidation.js";

const router = express.Router();

router.post("/addClass", addClass);

export default router;
