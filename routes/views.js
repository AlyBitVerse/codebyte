const express = require("express");
const router = express.Router();
const { notAuthenticatedMiddleware, authMiddleware } = require("../middleware/auth");
const serveHTML = require("../utils/helper");
const ChallengeRepository = require("../repositories/challengeRepo");
const challengeRepo = new ChallengeRepository();
router.get("/profile", authMiddleware(), serveHTML("profile"));

router.get("/auth", notAuthenticatedMiddleware, serveHTML("auth"));

router.get(
  "/challenges/:id",
  authMiddleware(false),
  async (req, res, next) => {
    try {
      const challenge = await challengeRepo.getItemById(req.params.id);
      if (challenge) {
        if (challenge.status === "active") return next();
        if (req.user) if (req.user.role === "admin") return next();
      }
      return res.status(404).send("<h1>404 ~ Challenge Not Found</h1>");
    } catch (error) {
      return res.status(404).send("<h1>404 ~ Challenge Not Found</h1>");
    }
  },
  serveHTML("challenge")
);
router.get("/challenges", serveHTML("challenges"));

router.get("/new-challenge", authMiddleware(true), serveHTML("new-challenge"));

module.exports = router;
