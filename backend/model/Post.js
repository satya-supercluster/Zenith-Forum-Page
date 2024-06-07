const mongoose = require("mongoose");

// Define the schema for the answers subdocument
const answerSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
    required: true,
  },
});

// Define the schema for the posts document
const postSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      default: 0,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    answers: [answerSchema],
  },
  { timestamps: true }
);

// Create and export the model
const Post = mongoose.model("Post", postSchema);
module.exports = Post;
