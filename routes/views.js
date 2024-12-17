const express = require("express");
const router = express.Router();
const {
  notAuthenticatedMiddleware,
  authMiddleware,
} = require("../middleware/auth");
const serveHTML = require("../utils/helper");
const ChallengeRepository = require("../repositories/challengeRepo");
const repo = new ChallengeRepository();
router.get("/profile", authMiddleware(), serveHTML("profile"));

router.get("/auth", notAuthenticatedMiddleware, serveHTML("auth"));

router.get(
  "/challenges/:id",
  async (req, res, next) => {
    const challengeExists = await repo.itemExistsById(req.params.id);
    if (challengeExists) return next();
    return res.status(404).send("<h1>404 ~ Challenge Not Found</h1>");
  },
  serveHTML("challenge")
);
router.get("/challenges", serveHTML("challenges"));

module.exports = router;
