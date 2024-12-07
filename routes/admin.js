const express = require("express");
const router = express.Router();

const challengeController = require("../controllers/challengeController");
const userController = require("../controllers/userController");

const { roleMiddleware, authMiddleware } = require("../middleware/auth");

router.use(authMiddleware, roleMiddleware(["admin"]));

router.get("/users", userController.getAllUsers);

router.get("/users/:id", userController.getUserById);
router.put("/users/:id", userController.updateUserById);
router.delete("/users/:id", userController.deleteUserById);

router.get("/challenges", challengeController.getAllChallenges);

router.post("/challenges/:id", challengeController.approveChallengeById);
router.post("/challenges/:id", challengeController.rejectChallengeById);

module.exports = router;
