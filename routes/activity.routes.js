import express from "express";
import { getMyRiskLogs } from "../controllers/activity.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/me", auth, getMyRiskLogs);

export default router;
