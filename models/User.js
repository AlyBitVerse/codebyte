class User {
  constructor(
    id,
    username,
    name,
    email,
    password,
    role = "user",
    createdAt = new Date(),
    updatedAt = new Date(),
    rank = 0,
    points = 0,
    createdChallenges = [],
    solvedChallenges = [],
    badges = []
  ) {
    if (!username || !name || !email || !password) {
      throw new Error("Missing required fields");
    }
    this.id = id;
    this.username = username;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.rank = rank;
    this.points = points;
    this.createdChallenges = createdChallenges;
    this.solvedChallenges = solvedChallenges;
    this.badges = badges;
  }
}

module.exports = User;
