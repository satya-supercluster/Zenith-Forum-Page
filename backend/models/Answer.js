const mongoose = require("mongoose");

// Define the schema for the answers subdocument
const answerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
});

// Create and export the model
const Answer = mongoose.model("Answer", answerSchema);
module.exports = Answer;
