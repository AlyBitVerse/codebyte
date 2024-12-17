const { uid } = require("uid");
const Challenge = require("../models/Challenge");
const ChallengeRepository = require("../repositories/challengeRepo");
const Judge0 = require("../services/Judge0");
class ChallengeController {
  static #repo = new ChallengeRepository();
  static validKeys = [
    "creatorID",
    "language",
    "category",
    "updatedAt",
    "difficulty",
    "status",
    "createdAt",
    "approvedAt",
    "approvedBy",
    "participants",
    "tags",
  ];

  /**
   *
   * @Universal
   */
  async getChallenges(req, res) {
    const allChallenges = await ChallengeController.#repo.getAllItems();
    const activeChallenges = allChallenges.filter(
      (challenge) => challenge.status === "active"
    );

    const isAuthenticated = req.user;
    const isAdmin = isAuthenticated ? req.user.role === "admin" : false;

    // If no query parameters are provided, return challenges based on the user's role
    if (!req.query || Object.keys(req.query).length === 0) {
      return res
        .status(200)
        .json(
          (isAuthenticated && !isAdmin) || !isAuthenticated
            ? activeChallenges
            : allChallenges
        );
    }

    let filteredChallenges =
      (isAuthenticated && !isAdmin) || !isAuthenticated
        ? activeChallenges
        : allChallenges;

    Object.entries(req.query).forEach(([key, value]) => {
      if (value) {
        if (
          (ChallengeController.validKeys.includes(key) && isAdmin) ||
          (["language", "difficulty", "category"].includes(key) &&
            (!isAuthenticated || !isAdmin))
        ) {
          filteredChallenges = filteredChallenges.filter((challenge) => {
            if (Array.isArray(challenge[key])) {
              return challenge[key].some((tag) =>
                value.split(",").includes(tag)
              );
            }
            return challenge[key] === value;
          });
        }
      }
    });

    return res.status(200).json(filteredChallenges);
  }

  /**
   *
   * @Universal
   */
  async getChallenge(req, res) {
    const isAuthenticated = req.user;
    const isAdmin = isAuthenticated ? req.user.role === "admin" : false;

    try {
      const challengeId = req.params.id;
      if (!challengeId) {
        return res.status(400).json({ message: "Challenge ID is required." });
      }

      const challenge = await ChallengeController.#repo.getItemById(
        challengeId
      );

      if (!challenge) {
        return res.status(404).json({ message: "Challenge not found." });
      }

      if (isAdmin) {
        return res.status(200).json(challenge);
      }

      if (challenge.status === "active") {
        return res.status(200).json(challenge);
      } else {
        return res
          .status(500)
          .json({ message: "An error occurred while fetching the challenge." });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "An error occurred while fetching the challenge." });
    }
  }

  /**
   * @Universal
   */
  async fetchSupportedLanguages(req, res) {
    const languages = await Judge0.fetchLanguages();
    return res.status(200).json(languages);
  }

  /**
   * @Protected
   */

  async createChallenge(req, res) {
    // Get current user id from req
    const creatorID = req.user.id;
    // Check authority
    const isAdmin = req.user.role === "admin";
    // Create a new Challenge id
    const challengeID = uid(16);
    // Validations
    const {
      title,
      description,
      language,
      category,
      instructions,
      difficulty,
      testCases,
      tags,
    } = req.body;
    if (!title) res.status(400).json({ message: "Title is required" });
    if (!description)
      res.status(400).json({ message: "Description is required" });
    if (!language) res.status(400).json({ message: "Language is required" });
    if (!category) res.status(400).json({ message: "Category is required" });
    if (!instructions)
      res.status(400).json({ message: "Instructions are required" });
    if (!difficulty)
      res.status(400).json({ message: "Difficulty is required" });
    if (!testCases.length)
      res
        .status(400)
        .json({ message: "A minimum of 1 test case is required." });
    // Create a new Challenge object
    const challenge = new Challenge(
      challengeID,
      creatorID,
      title,
      description,
      instructions,
      language,
      category,
      difficulty,
      isAdmin ? "active" : "pending",
      new Date(),
      new Date(),
      isAdmin ? new Date() : null,
      isAdmin ? req.user.id : null,
      testCases,
      {},
      tags
    );
    // Serialize and add the new challenge to the challenges collection
    try {
      await ChallengeController.#repo.createItem(challenge);
      res.status(201).json({ message: "Challenge created successfully" });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new ChallengeController();
