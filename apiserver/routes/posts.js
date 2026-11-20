const express = require("express");
const { getMyPosts } = require("../controllers/posts");
const { verifyToken } = require("../middlewares");

const router = express.Router();

// GET /posts/my
router.get("/my", verifyToken, getMyPosts);

module.exports = router;
