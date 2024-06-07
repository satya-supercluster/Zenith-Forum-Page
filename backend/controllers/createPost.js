const Post = require("../models/Post");
const User = require("../models/User");
const createPost = async (req, res) => {
  try {
    const { topic, message, userId } = req.body;

    // Validate required fields
    if (!topic || !message || !userId) {
      return res
        .status(400)
        .json({ error: "topic, message, and userId are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newPost = new Post({
      topic,
      message,
      user: user._id,
    });

    // Save the post to the database
    const savedPost = await newPost.save();

    // Add the post ID to the user's posts array
    user.posts.push(savedPost._id);
    await user.save();

    // Optionally, you can populate the user field before sending the response
    const populatedPost = await Post.findById(savedPost._id).populate(
      "user",
      "name"
    );

    // Return the saved post (populated with user name)
    res.status(201).json({populatedPost,savedPost});
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = createPost;
