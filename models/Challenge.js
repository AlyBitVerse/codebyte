class Challenge {
  constructor(
    id,
    creatorID,
    title,
    description,
    instructions,
    language, // {id: 102, name: "JavaScript (Node.js 22.08.0)"}
    category,
    difficulty,
    status = "pending",
    createdAt,
    updatedAt,
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
    this.language = language;
    this.category = category;
    this.difficulty = difficulty;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.status = status;
    this.approvedAt = approvedAt;
    this.approvedBy = approvedBy;
    this.testCases = testCases;
    this.participants = participants;
    this.tags = tags;
  }
}

module.exports = Challenge;
