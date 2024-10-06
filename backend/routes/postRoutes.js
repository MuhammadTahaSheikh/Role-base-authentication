const express = require("express");
const { getPosts, getPostById, createPost, updatePost, deletePost } = require("../controllers/postController");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/", protect, admin, createPost);
router.put("/:id", protect, admin, updatePost);
router.delete("/:id", protect, admin, deletePost);

module.exports = router;
