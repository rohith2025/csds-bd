import Post from "../models/Post.model.js";

export const createPost = async (req, res) => {
  const post = await Post.create({
    author: req.user.id,
    caption: req.body.caption,
    photo: req.body.photo,
  });

  res.status(201).json(post);
};

export const getAllPosts = async (req, res) => {
  const posts = await Post.find().populate("author", "username profilePhoto");
  res.json(posts);
};
