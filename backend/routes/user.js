const express = require("express");
const { isLoggedIn } = require("../middlewares");
const { followUser } = require("../controllers/user");
const router = express.Router();

// POST /user/:id/follow
router.post("/:id/follow", isLoggedIn, followUser);
module.exports = router;
