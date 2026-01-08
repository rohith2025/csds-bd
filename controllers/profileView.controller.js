import ProfileView from "../models/ProfileView.model.js";
import { logActivity } from "../services/activity.service.js";

export const viewProfile = async (req, res) => {
  await ProfileView.create({
    viewer: req.user.id,
    viewedUser: req.params.id,
  });

  await logActivity({
    actor: req.user.id,
    target: req.params.id,
    actionType: "profile_view",
  });

  res.json({ message: "Profile viewed" });
};
