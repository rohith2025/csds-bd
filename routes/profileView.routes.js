import express from "express";
import { viewProfile } from "../controllers/profileView.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/:id", auth, viewProfile);

export default router;
