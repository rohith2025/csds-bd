import express from "express";
import {
  createPost,
  getAllPosts,
} from "../controllers/post.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", auth, createPost);
router.get("/", auth, getAllPosts);

export default router;
