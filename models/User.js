class User {
  constructor(
    id,
    username,
    email,
    password,
    role,
    createdAt,
    updatedAt,
    rank,
    points,
    createdChallenges,
    solvedChallenges,
    badges
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role || "user";
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
    this.rank = rank || 0;
    this.points = points || 0;
    this.createdChallenges = createdChallenges || [];
    this.solvedChallenges = solvedChallenges || [];
    this.badges = badges || [];
  }
}

module.exports = User;
