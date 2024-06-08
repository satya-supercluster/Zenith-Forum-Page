const Post = require("../models/Post");
const User = require("../models/User");
const postDownvote = async (req, res) => {
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

    const likeIndex = post.likes.indexOf(userId);
    if (likeIndex !== -1) {
      post.likes.splice(likeIndex, 1);
    } else {
      return res.status(400).json({ error: "User has not liked this post" });
    }

    const updatedPost = await post.save();
    res.status(200).json({ post: updatedPost });
  } catch (err) {
    res
      .status(500)
      .json({ verdict: "Something went wrong", error: err.message });
  }
};
module.exports = postDownvote;