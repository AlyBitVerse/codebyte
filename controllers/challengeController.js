const ChallengeRepository = require("../repositories/challengeRepo");

class ChallengeController {
  static #repo = new ChallengeRepository();
  static validKeys = [
    "creatorID",
    "language",
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
          (["language", "difficulty", "tags"].includes(key) &&
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
        parseInt(challengeId)
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
}

module.exports = new ChallengeController();
