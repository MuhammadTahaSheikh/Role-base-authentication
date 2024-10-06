const Post = require("../models/Post");

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve posts" });
  }
};

// Get a single post by ID
exports.getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve post" });
  }
};

// Create a new post
exports.createPost = async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const newPost = new Post({ title, content, author });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: "Failed to create post" });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(id, { title, content }, { new: true });
    if (!updatedPost) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: "Failed to update post" });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) return res.status(404).json({ message: "Post not found" });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete post" });
  }
};
