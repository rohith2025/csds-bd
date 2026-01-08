import express from "express";
import {
  getProfile,
  followUser,
  unfollowUser,
} from "../controllers/user.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/:id", auth, getProfile);
router.post("/follow/:id", auth, followUser);
router.post("/unfollow/:id", auth, unfollowUser);

export default router;
