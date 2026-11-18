const express = require("express");
const { isLoggedIn } = require("../middlewares");
const { followUser, unfollowUser } = require("../controllers/user");
const router = express.Router();

// POST /user/:id/follow
router.post("/:id/follow", isLoggedIn, followUser);
// DELETE /user/:id/follow
router.delete("/:id/follow", isLoggedIn, unfollowUser);
module.exports = router;
