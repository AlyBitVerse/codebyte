class Challenge {
  constructor(
    id,
    creatorID,
    title,
    description,
    instructions,
    difficulty,
    solution,
    status = "pending",
    createdAt,
    approvedAt = null,
    approvedBy = null, //Should be user instance or ID?
    testCases = [],
    participants = {}, // e.g., { userID: { attempts: 3, successful: true } }
    tags = []
  ) {
    this.id = id;
    this.creatorID = creatorID;
    this.title = title;
    this.description = description;
    this.instructions = instructions;
    this.difficulty = difficulty;
    this.solution = solution;
    this.createdAt = createdAt;
    this.status = status;
    this.approvedAt = approvedAt;
    this.approvedBy = approvedBy;
    this.testCases = testCases;
    this.participants = participants;
    this.tags = tags;
  }
}

module.exports = Challenge;
