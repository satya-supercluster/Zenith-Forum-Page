const Post = require("../models/Post");
const User = require("../models/User");
const Answer = require("../models/Answer");

const createAnswer = async (req, res) => {
  try {
    const { answer, userId, postId } = req.body;

    // Validate required fields
    if (!answer || !userId || !postId) {
      return res
        .status(400)
        .json({ error: "Answer, postId and userId are required" });
    }

    const [post, user] = await Promise.all([
      Post.findById(postId),
      User.findById(userId),
    ]);

    // Check if the post and user exist
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create the new answer
    const newAnswer = new Answer({
      user: userId,
      answer: answer,
      post: postId,
    });
    // Add the answer to the post
    const savedAnswer = await newAnswer.save();

    post.answers.push(savedAnswer._id);

    // Save the updated post
    const updatedPost = await post.save();

    // Return the updated post
    res.status(201).json({ updatedPost, savedAnswer });
  } catch (error) {
    console.error("Error adding answer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports=createAnswer