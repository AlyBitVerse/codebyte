const express = require("express");
const router = express.Router();

const challengeController = require("../controllers/challengeController");
const userController = require("../controllers/userController");
const {
  notAuthenticatedMiddleware,
  authMiddleware,
} = require("../middleware/auth");

router.post("/register", notAuthenticatedMiddleware, userController.createUser);

router.post("/login", notAuthenticatedMiddleware, userController.loginUser);

router.get(
  "/challenges",
  authMiddleware(false),
  challengeController.getChallenges
);

// router.get(
//   "/challenges/languages",
//   challengeController.fetchSupportedLanguages
// );

router.get(
  "/challenges/:id",
  authMiddleware(false),
  challengeController.getChallenge
);

module.exports = router;
