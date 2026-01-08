import express from "express";
import { sendMessage } from "../controllers/message.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/send", auth, sendMessage);

export default router;
