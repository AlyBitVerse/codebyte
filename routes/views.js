const express = require("express");
const router = express.Router();
const {
  notAuthenticatedMiddleware,
  authMiddleware,
} = require("../middleware/auth");
const serveHTML = require("../utils/helper");

router.get("/profile", authMiddleware(), serveHTML("profile"));

router.get("/auth", notAuthenticatedMiddleware, serveHTML("auth"));

router.get("/challenge", serveHTML("challenge"));
router.get("/challenges", serveHTML("challenges"));

module.exports = router;
