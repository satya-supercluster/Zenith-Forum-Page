const User = require("../models/User");
const Answer = require("../models/Answer");
const answerUpvote = async (req, res) => {
  try {
    const { answerId, userId } = req.body;
    if (!answerId || !userId) {
      return res
        .status(400)
        .json({ error: "answerId and userId are required" });
    }

    const answer = await Answer.findById(answerId);
    if (!answer) {
      return res.status(400).json({ error: "Answer not Found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "User not Found" });
    }

    if (!answer.likes.includes(userId)) {
      answer.likes.push(userId);
    }

    const updatedAnswer = await answer.save();
    res.status(200).json({ answer: updatedAnswer });
  } catch (err) {
    res
      .status(500)
      .json({ verdict: "Something went wrong", error: err.message });
  }
};
module.exports = answerUpvote;