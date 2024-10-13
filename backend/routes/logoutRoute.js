import express from "express";

import logoutController from "../controller/logout.js";

const router = express.Router();

router.post("/logout", logoutController);

export default router;
