const Post = require("../models/Post");
const User = require("../models/User");
const postUpvote = async (req, res) => {
  try {
    const { postId, userId } = req.body;
    if (!postId || !userId) {
      return res.status(400).json({ error: "postId and userId are required" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(400).json({ error: "Post not Found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "User not Found" });
    }

    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
    }

    const updatedPost = await post.save();
    res.status(200).json({ post: updatedPost });
  } catch (err) {
    res
      .status(500)
      .json({ verdict: "Something went wrong", error: err.message });
  }
};
module.exports = postUpvote;
