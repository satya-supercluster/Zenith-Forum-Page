const mongoose = require("mongoose");
const Answer = require("./Answer");

// Define the schema for the posts document
const postSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      // required: true,
    },
    message: {
      type: String,
      // required: true,
    },
    score: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    answers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer",
      },
    ],
  },
  { timestamps: true }
);

// Create and export the model
const Post = mongoose.model("Post", postSchema);
module.exports = Post;
