import Story from "../models/Story.model.js";

export const createStory = async (req, res) => {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24);

  const story = await Story.create({
    author: req.user.id,
    photo: req.body.photo,
    expiresAt,
  });

  res.status(201).json(story);
};

export const viewStory = async (req, res) => {
  const story = await Story.findById(req.params.id);

  if (!story.views.includes(req.user.id)) {
    story.views.push(req.user.id);
    await story.save();
  }

  res.json({ message: "Story viewed" });
};
