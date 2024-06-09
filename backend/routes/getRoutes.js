// routes/users.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Fetch a user with their posts
router.get("/users", async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId).populate("posts");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});




// routes/post.js
const Post = require("../models/Post");
const verifyToken = require("../middleware/verifyToken");

// GET /api/posts - Get all posts with populated data
router.get("/posts",verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate({
        path: "user",
        select: "name",
      })
      .populate({
        path: "likes",
        select:"_id"
      })
      .populate({
        path: "answers",
        populate: [
          { path: "user", select: "name avatar" },
          { path: "likes", select: "_id" },
        ],
      })
      .sort({ createdAt: -1 }); // Sort by creation date, newest first

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
});



module.exports = router;
