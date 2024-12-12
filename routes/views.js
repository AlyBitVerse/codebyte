const express = require("express");
const router = express.Router();
const {
  notAuthenticatedMiddleware,
  authMiddleware,
} = require("../middleware/auth");
const serveHTML = require("../utils/helper");

router.get("/challenge", serveHTML("challenge"));

router.get("/challenges", serveHTML("challenges"));

router.get("/profile", authMiddleware, serveHTML("profile"));

router.get("/auth", notAuthenticatedMiddleware, serveHTML("auth"));

module.exports = router;
