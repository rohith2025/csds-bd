import express from "express";
import {
  createStory,
  viewStory,
} from "../controllers/story.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", auth, createStory);
router.post("/view/:id", auth, viewStory);

export default router;
