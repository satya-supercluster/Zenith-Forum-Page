// prefix -> /api/post
const Post = require("../models/Post");
const Answer = require("../models/Post");
const router = require("express").Router();
// Controllers
const createPost = require("../controllers/createPost");

// POST - Create a new post
router.post("/post", createPost);

// ANSWER - Create an answer
router.post("/answer", async (req, res) => {
  try {
    const { answer, userId, postId } = req.body;

    // Validate required fields
    if (!answer || !userId || !postId) {
      return res
        .status(400)
        .json({ error: "Answer, postId and userId are required" });
    }

    // Find the post by ID
    const post = await Post.findById(postId);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    // Create the new answer
    const newAnswer = new Answer({
      user: userId,
      answer:answer
    });
    // Add the answer to the post
    await newAnswer.save();

    post.answers.push(newAnswer._id);

    // Save the updated post
    const updatedPost = await post.save();

    // Return the updated post
    res.status(201).json(updatedPost);
  } catch (error) {
    console.error("Error adding answer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

// 66630df64a15253d7d8deb63
