const express = require("express");
const router = express.Router();

const challengeController = require("../controllers/challengeController");
const userController = require("../controllers/userController");

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/challenges", challengeController.getChallenges);

router.get("/challenges/:id", challengeController.getActiveChallenge);

module.exports = router;
