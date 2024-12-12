const express = require("express");
const router = express.Router();

const challengeController = require("../controllers/challengeController");
const userController = require("../controllers/userController");

router.post("/register", userController.createUser);

router.post("/login", userController.loginUser);

router.get("/challenges", challengeController.getChallenges);

// router.get("/challenges/:id", challengeController.getActiveChallenge);

module.exports = router;
