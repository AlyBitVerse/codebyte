const dbManager = require("../utils/dbManager");
const User = require("../models/User");

class UserRepo {
  static async createUser(user) {
    try {
      await dbManager.readWrite("users", (users) => {
        users.push(user);
        return users; // IMPORTANT
      });
    } catch (error) {
      console.error("ERROR (UserRepo)::", "Error creating user:", error);
      throw error;
    }
  }

  static async updateUserById(id, newData) {
    try {
      await dbManager.readWrite("users", (users) => {
        const userIndex = users.findIndex((user) => user.id === id);
        if (userIndex === -1) throw new Error("User not found");
        users[userIndex] = { ...users[userIndex], ...newData };
        return users; // IMPORTANT
      });
    } catch (error) {
      console.error("ERROR (UserRepo)::", "Error updating user by ID:", error);
      throw error;
    }
  }

  static async getUserById(id) {
    try {
      const users = await this.getAllUsers();
      const user = users.find((user) => user.id === id);
      if (!user) throw new Error(`Cannot get user by id ${id}`);
      return user;
    } catch (error) {
      console.error(
        "ERROR (UserRepo)::",
        `Error getting user by ID: ${id}`,
        error
      );
      throw error;
    }
  }

  static async getUserByEmail(email) {
    try {
      const users = await this.getAllUsers();
      return users.find((user) => user.email === email);
    } catch (error) {
      console.error(
        "ERROR (UserRepo)::",
        `Error getting user by email: ${email}`,
        error
      );
      throw error;
    }
  }

  static async getAllUsers() {
    try {
      return await dbManager.readOnly("users");
    } catch (error) {
      console.error("ERROR (UserRepo)::", "Error getting users:", error);
      throw error;
    }
  }

  static async deleteUserById(id) {
    try {
      await dbManager.readWrite("users", (users) => {
        const filtered = users.filter((user) => user.id !== id);
        return filtered; // IMPORTANT
      });
      console.info("SUCCESS (UserRepo)::", "User deleted.");
    } catch (error) {
      console.error("ERROR (UserRepo)::", "Error deleting user:", error);
      throw error;
    }
  }

  static async clearRepository() {
    try {
      await dbManager.writeOnly("users", []);
      console.info("SUCCESS (UserRepo)::", "Cleared users repository.");
    } catch (error) {
      console.error("ERROR (UserRepo)::", "Error clearing repository:", error);
      throw error;
    }
  }
}

module.exports = UserRepo;

async function test() {
  console.log("Testing createUser fn..");
  const dummyUsers = [
    new User(
      1,
      "admin_john",
      "admin.john@example.com",
      "hashed_password_for_admin",
      "admin",
      new Date("2023-01-01"),
      new Date("2023-12-09"),
      1,
      2000,
      ["challenge1", "challenge2"],
      ["challenge3"],
      ["admin_badge"]
    ),
    new User(
      2,
      "mod_alex",
      "mod.alex@example.com",
      "hashed_password_for_moderator",
      "moderator",
      new Date("2023-02-15"),
      new Date("2023-12-09"),
      3,
      1500,
      ["challenge3"],
      ["challenge1", "challenge4"],
      ["moderator_badge"]
    ),
    new User(
      3,
      "user_susan",
      "user.susan@example.com",
      "hashed_password_for_user",
      "user",
      new Date("2023-03-10"),
      new Date("2023-12-09"),
      5,
      1000,
      [],
      ["challenge2", "challenge5"],
      ["beginner_badge"]
    ),
    new User(
      4,
      "user_mike",
      "user.mike@example.com",
      "hashed_password_for_mike",
      "user",
      new Date("2023-04-05"),
      new Date("2023-12-09"),
      6,
      1200,
      ["challenge6"],
      ["challenge7"],
      ["intermediate_badge"]
    ),
    new User(
      5,
      "mod_jane",
      "mod.jane@example.com",
      "hashed_password_for_jane",
      "moderator",
      new Date("2023-05-18"),
      new Date("2023-12-09"),
      2,
      1800,
      ["challenge8"],
      ["challenge1", "challenge6"],
      ["moderator_badge"]
    ),
  ];

  await dummyUsers.forEach(async (user) => {
    await UserRepo.createUser(user);
  });

  console.log("Testing getAllUsers fn..");
  await UserRepo.getAllUsers().then((users) =>
    users.forEach((user) => console.log("id:", user.id, user.username))
  );

  console.log("Testing getUserById fn..");
  await UserRepo.getUserById(2).then((user) =>
    console.log(user.username, "rank:", user.rank)
  );

  console.log("Testing getUserByEmail fn..");
  await UserRepo.getUserByEmail("user.susan@example.com").then((user) =>
    console.log(user.username, "rank:", user.rank)
  );

  console.log("Testing updateUserById fn..");
  UserRepo.updateUserById(3, { username: "emao", rank: 3 });
  UserRepo.updateUserById(1, { username: "alpha", rank: 7 });
  await UserRepo.updateUserById(2, { username: "shero", rank: 4 });

  console.log("Testing deleteUserById fn..");
  await UserRepo.deleteUserById(4);

  // console.log("Testing clearRepository fn..");
  // UserRepo.clearRepository();
}

test();
