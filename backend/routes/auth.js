const express = require("express");
const passport = require("passport");
const { join, login, logout } = require("../controllers/auth");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");

const router = express.Router();

// POST /auth/join
router.post("/join", isNotLoggedIn, join);
// POST /auth/login
router.post("/login", isNotLoggedIn, login);
// GET /auth/logout
router.get("/logout", isLoggedIn, logout);
// GET /auth/kakao
router.get("/kakao", isNotLoggedIn, passport.authenticate("kakao"));
// GET /auth/kakao/callback
router.get(
  "/kakao/callback",
  isNotLoggedIn,
  passport.authenticate("kakao", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("/");
  },
);
module.exports = router;
