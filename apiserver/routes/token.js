const express = require("express");
const { createToken, tokenTest } = require("../controllers/token");
const { verifyToken } = require("../middlewares");

const router = express.Router();

// POST /token
router.post("/", createToken);
// GET /token/test
router.get("/test", verifyToken, tokenTest);

module.exports = router;
