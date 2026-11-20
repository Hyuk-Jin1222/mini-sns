const express = require("express");
const { createToken, tokenTest } = require("../controllers/token");
const { verifyToken, corsWhenDomainMatches } = require("../middlewares");

const router = express.Router();

router.use(corsWhenDomainMatches);

// POST /token
router.post("/", createToken);
// GET /token/test
router.get("/test", verifyToken, tokenTest);

module.exports = router;
