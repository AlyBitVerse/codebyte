const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const challengeController = require("../controllers/challengeController");

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/challenges", challengeController.getActiveChallenges);

router.get("/challenges/:id", challengeController.getActiveChallenge);

module.exports = router;
