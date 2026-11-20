const express = require("express");
const { getDomains, createDomain } = require("../controllers/domain");
const { isLoggedIn } = require("../middlewares");

const router = express.Router();

// GET /domain
router.get("/", isLoggedIn, getDomains);
// POST /domain
router.post("/", isLoggedIn, createDomain);

module.exports = router;
