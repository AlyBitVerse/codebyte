const fs = require("fs");
const path = require("path");
const dbPath = path.join(__dirname, "..", "data", "db.json");

class UserRepo {
  static async createUser(user) {
    try {
      const users = await this.getAllUsers(); // Get all existing users
      users.push(user); // Add the new user to the array
      await this.#saveUsers(users); // Save the updated users list back to the file
    } catch (error) {
      console.error("ERROR (UserRepo)::", "Error creating user:", error);
      throw error;
    }
  }

  static async updateUserById(id, newData) {
    try {
      const users = await this.getAllUsers();
      const userIndex = users.findIndex((user) => user.id === id);
      if (userIndex === -1) throw new Error("User not found");
      users[userIndex] = { ...users[userIndex], ...newData };
      await this.#saveUsers(users);
    } catch (error) {
      console.error("ERROR (UserRepo)::", "Error updating user by ID:", error);
      throw error;
    }
  }

  static async getUserById(id) {
    try {
      const users = await this.getAllUsers();
      return users.find((user) => user.id === id);
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
      if (!fs.existsSync(dbPath)) {
        // If file doesn't exist, initialize it with an empty array
        await fs.promises.writeFile(
          dbPath,
          JSON.stringify({ users: [] }, null, 2)
        );
        return [];
      }

      const data = await fs.promises.readFile(dbPath, "utf-8");
      if (!data || data.trim() === "") {
        return []; // Return empty array if file is empty or only contains spaces
      }

      const parsedData = JSON.parse(data);
      return parsedData.users || [];
    } catch (error) {
      console.error("ERROR (UserRepo)::", "Error getting users:", error);
      throw error;
    }
  }

  static async deleteUserById(id) {
    try {
      const users = await this.getAllUsers();
      const filtered = users.filter((user) => user.id !== id);
      await this.#saveUsers(filtered);
      console.info("SUCCESS (UserRepo)::", "User deleted.");
    } catch (error) {
      console.error("ERROR (UserRepo)::", "Error deleting user:", error);
      throw error;
    }
  }

  static async #saveUsers(users) {
    try {
      const data = JSON.stringify({ users }, null, 2); // Wrap the users array inside an object
      await fs.promises.writeFile(dbPath, data, "utf-8"); // Save the updated users to db.json
      console.info("SUCCESS (UserRepo)::", "Updated users.");
    } catch (error) {
      console.error("ERROR (UserRepo)::", "Error saving users:", error);
      throw error;
    }
  }
}

module.exports = UserRepo;

// Test cases for creating users
async function testCreateUsers() {
  await UserRepo.createUser({
    id: "1", // Make sure to include an ID
    name: "Mohamed",
    email: "moedris.dev@gmail.com",
    role: "admin",
    password: "123",
  });

  await UserRepo.createUser({
    id: "2", // Make sure to include an ID
    name: "Eiman",
    email: "eimanhamdy99@gmail.com",
    role: "admin",
    password: "123",
  });

  await UserRepo.createUser({
    id: "3", // Make sure to include an ID
    name: "Shereen",
    email: "sherocode@gmail.com",
    role: "admin",
    password: "123",
  });
}

testCreateUsers();
