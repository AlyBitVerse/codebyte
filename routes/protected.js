const express = require("express");
const router = express.Router();

const challengeController = require("../controllers/challengeController");
const userController = require("../controllers/userController");

router.get("/me", userController.getCurrentUser);
router.put("/me", userController.updateCurrentUser);

// router.post("/challenges", challengeController.createChallenge);

// router.put("/challenges/:id", challengeController.updateChallenge); // must be same user that created the challenge or an admin (check)
// router.delete("/challenges/:id", challengeController.deleteChallenge); // must be same user that created the challenge or an admin (check)

// router.post("/challenges/:id/solve", challengeController.solveChallenge); // will use judge0 service

module.exports = router;
