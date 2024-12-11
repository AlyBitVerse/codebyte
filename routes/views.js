const express = require("express");
const router = express.Router();

const serveHTML = require("../utils/helper");
router.get("/challenge", serveHTML("challenge"));

router.get("/challenges", serveHTML("challenges"));

router.get("/profile", serveHTML("profile"));

router.get("/auth", serveHTML("auth"));

module.exports = router;
