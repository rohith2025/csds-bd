import User from "../models/User.model.js";

export const getProfile = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  res.json(user);
};

export const followUser = async (req, res) => {
  const user = await User.findById(req.user.id);
  const target = await User.findById(req.params.id);

  if (!target.followers.includes(user._id)) {
    target.followers.push(user._id);
    user.following.push(target._id);
    await target.save();
    await user.save();
  }

  res.json({ message: "Followed successfully" });
};

export const unfollowUser = async (req, res) => {
  const user = await User.findById(req.user.id);
  const target = await User.findById(req.params.id);

  target.followers = target.followers.filter(
    (id) => id.toString() !== user._id.toString()
  );
  user.following = user.following.filter(
    (id) => id.toString() !== target._id.toString()
  );

  await target.save();
  await user.save();

  res.json({ message: "Unfollowed successfully" });
};
