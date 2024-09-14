import express from "express";
import auth from "../middleware/auth.js";
import addClass from "../controller/classController.js";

import v from "../middleware/validation.js";

const router = express.Router();

router.post("/addClass", auth, addClass);

export default router;
