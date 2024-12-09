const fs = require("fs");
const path = require("path");

const { Mutex } = require("async-mutex");
const dbPath = path.join(__dirname, "..", "data", "db.json");

class DbManager {
  static #mutex = new Mutex();
  static tables = { users: [], challenges: [] };
  constructor() {
    if (DbManager.instance) return DbManager.instance;
    DbManager.instance = this;
  }

  async readOnly(shouldAcquire = true) {
    let release;
    if (shouldAcquire) release = await DbManager.#mutex.acquire();
    try {
      if (!fs.existsSync(dbPath)) {
        await fs.promises.writeFile(
          dbPath,
          JSON.stringify({ users: [], challenges: [] }, null, 2)
        );
        return { users: [], challenges: [] };
      }

      const data = await fs.promises.readFile(dbPath, "utf-8");
      if (!data || data.trim() === "" || data.trim() === "{}") {
        await fs.promises.writeFile(
          dbPath,
          JSON.stringify({ users: [], challenges: [] }, null, 2)
        );
        return { users: [], challenges: [] };
      }

      const parsedData = JSON.parse(data);
      return parsedData || { users: [], challenges: [] };
    } catch (error) {
      console.error("ERROR (DbManager)::", "Error reading data:", error);
      throw error;
    } finally {
      if (release) release();
    }
  }

  async writeOnly(data) {
    const release = await DbManager.#mutex.acquire();
    try {
      const readyData = JSON.stringify(data, null, 2);
      await fs.promises.writeFile(dbPath, readyData, "utf-8");
      console.info("SUCCESS (DbManager)::", "Data overwritten successfully.");
    } catch (error) {
      console.error("ERROR (DbManager)::", "Error overwriting data:", error);
      throw error;
    } finally {
      release();
    }
  }

  async readWrite(modify) {
    const release = await DbManager.#mutex.acquire();
    try {
      const data = await this.readOnly(false);
      const modifiedData = modify(data);
      await fs.promises.writeFile(
        dbPath,
        JSON.stringify(modifiedData),
        "utf-8"
      );
      console.info("SUCCESS (DbManager)::", "Data upated successfully.");
    } catch (error) {
      console.error("ERROR (DbManager)::", "Error updating data:", error);
      throw error;
    } finally {
      release();
    }
  }
}

module.exports = DbManager;

function testRWOperations(iterations = 5) {
  db.writeOnly(DbManager.tables);
  Array.from({ length: iterations }).forEach((_, i) => {
    db.readWrite((existingData) => {
      existingData.users.push({
        id: i + 1,
        name: `User${Math.ceil(Math.random().toFixed(2) * 100)}`,
      });
      return existingData;
    });

    db.readOnly().then((data) =>
      console.log(`Log #${i}`, JSON.stringify(data))
    );

    db.readWrite((existingData) => {
      existingData.challenges.push({
        id: i + 1,
        name: `Challenge${Math.ceil(Math.random().toFixed(2) * 100)}`,
      });
      return existingData;
    });
  });
}

const db = new DbManager();
// testRWOperations();

function testUserModel() {
  const User = require("../models/User");

  // Dummy Admin User
  const adminUser = new User(
    1, // id
    "admin_john", // username
    "admin.john@example.com", // email
    "hashed_password_for_admin", // password (hash it in reality)
    "admin", // role
    new Date("2023-01-01"), // createdAt
    new Date("2023-12-09"), // updatedAt
    1, // rank
    2000, // points
    ["challenge1", "challenge2"], // createdChallenges
    ["challenge3"], // solvedChallenges
    ["admin_badge"] // badges
  );

  const moderatorUser = new User(
    2, // id
    "mod_alex", // username
    "mod.alex@example.com", // email
    "hashed_password_for_moderator", // password
    "moderator", // role
    new Date("2023-02-15"), // createdAt
    new Date("2023-12-09"), // updatedAt
    3, // rank
    1500, // points
    ["challenge3"], // createdChallenges
    ["challenge1", "challenge4"], // solvedChallenges
    ["moderator_badge"] // badges
  );

  // Dummy Regular User
  const regularUser = new User(
    3, // id
    "user_susan", // username
    "user.susan@example.com", // email
    "hashed_password_for_user", // password
    "user", // role
    new Date("2023-03-10"), // createdAt
    new Date("2023-12-09"), // updatedAt
    5, // rank
    1000, // points
    [], // createdChallenges
    ["challenge2", "challenge5"], // solvedChallenges
    ["beginner_badge"] // badges
  );
  db.readWrite((existingData) => {
    existingData.users.push(adminUser);
    return existingData;
  });

  db.readWrite((existingData) => {
    existingData.users.push(regularUser);
    return existingData;
  });

  db.readWrite((existingData) => {
    existingData.users.push(moderatorUser);
    return existingData;
  });
}

// testUserModel();
