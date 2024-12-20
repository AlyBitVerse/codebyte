const { uid } = require("uid");
const Challenge = require("../models/Challenge");
const ChallengeRepository = require("../repositories/challengeRepo");
const UserRepository = require("../repositories/userRepo");
const Judge0 = require("../services/Judge0");
const User = require("../models/User");
const userRepo = new UserRepository();
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
    "updatedBy",
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
    const activeChallenges = allChallenges.filter((challenge) => challenge.status === "active");

    const isAuthenticated = req.user;
    const isAdmin = isAuthenticated ? req.user.role === "admin" : false;

    // If no query parameters are provided, return challenges based on the user's role
    if (!req.query || Object.keys(req.query).length === 0) {
      return res
        .status(200)
        .json((isAuthenticated && !isAdmin) || !isAuthenticated ? activeChallenges : allChallenges);
    }

    let filteredChallenges =
      (isAuthenticated && !isAdmin) || !isAuthenticated ? activeChallenges : allChallenges;

    Object.entries(req.query).forEach(([key, value]) => {
      if (value) {
        if (
          (ChallengeController.validKeys.includes(key) && isAdmin) ||
          (["language", "difficulty", "category"].includes(key) && (!isAuthenticated || !isAdmin))
        ) {
          filteredChallenges = filteredChallenges.filter((challenge) => {
            if (Array.isArray(challenge[key])) {
              return challenge[key].some((tag) => value.split(",").includes(tag));
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

      const challenge = await ChallengeController.#repo.getItemById(challengeId);

      if (!challenge) {
        return res.status(404).json({ message: "Challenge not found." });
      }

      if (isAdmin) {
        return res.status(200).json(challenge);
      }

      if (challenge.status === "active") {
        return res.status(200).json(challenge);
      } else {
        return res.status(500).json({ message: "An error occurred while fetching the challenge." });
      }
    } catch (error) {
      return res.status(500).json({ message: "An error occurred while fetching the challenge." });
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
    const { title, description, language, category, instructions, difficulty, testCases, tags } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });
    if (!description) return res.status(400).json({ message: "Description is required" });
    if (!language) return res.status(400).json({ message: "Language is required" });
    if (!category) return res.status(400).json({ message: "Category is required" });
    if (!instructions) return res.status(400).json({ message: "Instructions are required" });
    if (!difficulty) return res.status(400).json({ message: "Difficulty is required" });
    if (!testCases.length || !Array.isArray(JSON.parse(testCases)))
      return res.status(400).json({ message: "A minimum of 1 test case is required." });
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
      isAdmin || req.user.rank > User.BYPASS_RANK ? "active" : "pending",
      new Date(),
      new Date(),
      isAdmin || req.user.rank > User.BYPASS_RANK ? new Date() : null,
      isAdmin || req.user.rank > User.BYPASS_RANK ? req.user.id : null,
      JSON.parse(testCases),
      {},
      tags
    );

    try {
      await ChallengeController.#repo.createItem(challenge);

      const creator = await userRepo.getItemById(creatorID);
      const modifiedChallenges = creator.createdChallenges;
      modifiedChallenges.push(challengeID);
      await userRepo.updateItemById(creatorID, {
        createdChallenges: modifiedChallenges,
      });
      res.status(201).json({ message: "Challenge created successfully", id: challengeID });
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * @Protected
   */
  async updateChallenge(req, res) {
    const userID = req.user.id;
    const isAdmin = req.user.role === "admin";
    const challengeID = req.params.id;

    const validFields = [
      "language",
      "category",
      "title",
      "description",
      "instructions",
      "difficulty",
      "testCases",
    ];

    try {
      if (!isAdmin) {
        const user = await userRepo.getItemById(userID);

        if (!user.createdChallenges.includes(challengeID)) {
          return res.status(403).json({
            message: "You are not authorized to update this challenge.",
          });
        }
      }

      const invalidFields = Object.keys(req.body).filter((key) => !validFields.includes(key));
      if (invalidFields.length > 0) {
        return res.status(400).json({
          message: "Invalid fields provided.",
          invalidFields,
        });
      }

      // Update the challenge
      const updatedData = {
        ...req.body,
        updatedAt: new Date(),
        updatedBy: userID,
      };

      const challenge = await ChallengeController.#repo.updateItemById(challengeID, updatedData);

      return res.status(200).json({
        message: "Challenge updated successfully.",
        challenge,
      });
    } catch (err) {
      console.error("Error updating challenge:", err);
      return res.status(500).json({
        message: "An unexpected error occurred while updating the challenge.",
      });
    }
  }

  /**
   * @Protected
   */
  async deleteChallenge(req, res) {
    const userID = req.user.id;
    const isAdmin = req.user.role === "admin";
    const challengeID = req.params.id;

    try {
      if (!isAdmin) {
        const user = await userRepo.getItemById(userID);

        if (!user.createdChallenges.includes(challengeID)) {
          return res.status(403).json({
            message: "You are not authorized to delete this challenge.",
          });
        }
      }

      await ChallengeController.#repo.deleteItemById(challengeID);

      return res.status(200).json({
        message: "Challenge deleted successfully.",
      });
    } catch (err) {
      console.error("Error deleting challenge:", err);
      return res.status(500).json({
        message: "An unexpected error occurred while deleting the challenge.",
      });
    }
  }
}

module.exports = new ChallengeController();
