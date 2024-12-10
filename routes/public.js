const express = require("express");
const router = express.Router();

const challengeController = require("../controllers/challengeController");

router.post("/register", userController.createUser);

router.post("/login", userController.loginUser);

router.get("/challenges", challengeController.getActiveChallenges);

router.get("/challenges/:id", challengeController.getActiveChallenge);

module.exports = router;
