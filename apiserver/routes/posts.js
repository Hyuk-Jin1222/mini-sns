const express = require("express");
const { getMyPosts, getPostsByHashtag } = require("../controllers/posts");
const { verifyToken, corsWhenDomainMatches } = require("../middlewares");

const router = express.Router();

router.use(corsWhenDomainMatches);

// GET /posts/my
router.get("/my", verifyToken, getMyPosts);
// GET /posts/hashtag/:title
router.get("/hashtag/:title", verifyToken, getPostsByHashtag);

module.exports = router;
