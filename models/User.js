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

  static fromJSON(object) {
    return new User(
      object.id,
      object.username,
      object.name,
      object.email,
      object.password,
      object.role,
      object.createdAt,
      object.updatedAt,
      object.rank,
      object.points,
      object.createdChallenges,
      object.solvedChallenges,
      object.badges
    );
  }

  serialize() {
    return JSON.stringify(this);
  }

  toJSON(protect = false) {
    const userObject = {
      id: this.id,
      username: this.username,
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      rank: this.rank,
      points: this.points,
      createdChallenges: this.createdChallenges,
      solvedChallenges: this.solvedChallenges,
      badges: this.badges,
    };

    if (protect) {
      delete userObject.id;
      delete userObject.password;
      delete userObject.role;
    }

    return userObject;
  }
}

module.exports = User;
