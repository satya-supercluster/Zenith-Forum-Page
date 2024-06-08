// prefix -> /api/post
const Post = require("../models/Post");
const User = require("../models/User");
const Answer = require("../models/Answer");
const router = require("express").Router();

// Controllers
const createPost = require("../controllers/createPost");
const createAnswer = require("../controllers/createAnswer");
const postUpvote = require("../controllers/postUpvote");
const postDownvote = require("../controllers/postDownvote");
const answerDownvote = require("../controllers/answerDownvote");
const answerUpvote = require("../controllers/answerUpvote");

// POST - Create a new post
router.post("/post", createPost);

// ANSWER - Create an answer
router.post("/answer", createAnswer);


router.post("/post/inc", postUpvote);
router.post("/post/dec", postDownvote);


router.post("/answer/inc", answerUpvote);
router.post("/answer/dec", answerDownvote);


module.exports = router;
