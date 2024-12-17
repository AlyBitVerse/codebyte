const express = require("express");
const router = express.Router();

const challengeController = require("../controllers/challengeController");
const userController = require("../controllers/userController");
const { authMiddleware } = require("../middleware/auth");

router.use(authMiddleware(true));

router.get("/me", userController.getCurrentUser);
router.put("/me", userController.updateCurrentUser);

router.post("/logout", userController.logoutUser);

router.post("/challenges", challengeController.createChallenge);

router.patch("/challenges/:id", challengeController.updateChallenge);

router.delete("/challenges/:id", challengeController.deleteChallenge);

// router.post("/challenges/:id/solve", challengeController.solveChallenge); // will use judge0 service

module.exports = router;
