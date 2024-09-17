import express from "express";

import loginController from "../controller/loginController.js";
import loginSchema from "../validations/loginSchema.js";
import v from "../middleware/validation.js";

const router = express.Router();

router.post("/login", v(loginSchema), loginController);

export default router;
