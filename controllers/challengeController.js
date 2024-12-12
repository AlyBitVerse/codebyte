const ChallengeRepository = require("../repositories/challengeRepo");

class ChallengeController {
  static #repo = new ChallengeRepository();
  static validKeys = [
    "creatorID",
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

    // If no query parameters are provided, return challenges based on the user's role
    if (!req.query || Object.keys(req.query).length === 0) {
      return res.status(200).json({
        challenges:
          req.user?.role === "admin" ? allChallenges : activeChallenges,
      });
    }

    // Filtering based on valid keys
    let filteredChallenges =
      req.user.role === "admin" ? allChallenges : activeChallenges;

    // Filter challenges based on query params (direct matching)
    Object.entries(req.query).forEach(([key, value]) => {
      if (ChallengeController.validKeys.includes(key)) {
        filteredChallenges = filteredChallenges.filter((challenge) => {
          // If the value is a comma-separated string (like tags), split it into an array
          if (Array.isArray(challenge[key])) {
            return challenge[key].some((tag) => value.split(",").includes(tag));
          }
          return challenge[key] === value;
        });
      }
    });

    return res.status(200).json({ challenges: filteredChallenges });
  }
}

module.exports = new ChallengeController();
