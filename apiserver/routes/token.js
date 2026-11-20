const express = require("express");
const { createToken } = require("../controllers/token");

const router = express.Router();

// POST /token
router.post("/", createToken);

module.exports = router;
