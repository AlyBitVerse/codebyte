const UserRepository = require("../repositories/userRepo");
const User = require("../models/User");
const uid = require("uid");
const bcrypt = require("bcrypt");
const { signToken, verifyToken } = require("../utils/jwt");
class UserController {
  constructor() {
    this.repo = new UserRepository();
  }

  async createUser(req, res) {
    const { name, username, email, password } = req.body;
    if (!user.name || !user.email || !user.username || !user.password)
      return res.status().json({ message: "Missing required fields" });
    if (this.repo.userExistsByEmail(user.email))
      return res.status().json({ message: "A user with same email exists" });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return res.status(400).json({ message: "Invalid email format" });

    if (password.length < 8)
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });

    if (!username || username.length < 3 || username.length > 15) {
      return res
        .status(400)
        .json({ message: "Username must be between 3 and 15 characters long" });
    }

    // Ensure username only contains alphanumeric characters (no spaces or special characters)
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
      return res.status(400).json({
        message: "Username can only contain letters, numbers, and underscores",
      });
    }
    // Generate UID
    const userID = uid(16);
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      // Assemble user instance
      const user = new User(userID, username, name, email, hashedPassword); // name, username, email, password
      await this.repo.createItem(user);
      res.status(201).json({ message: "User created successfully" });
    } catch (e) {
      res.status(500).json({ message: "Server error", error: e.message });
    }
  }

  async loginUser(req, res) {
    const { username, email, password } = req.body;
    if (!user.email || !user.username || !user.password)
      return res.status().json({ message: "Missing required fields" });
    if (email)
      if (!this.repo.userExistsByEmail(user.email))
        return res.status().json({ message: "Invalid credentials" });
    // TODO: Add logic for signing in with username

    const user = await this.repo.getUserByEmail(email);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    try {
      const token = signToken(
        {
          id: userID,
          username: username,
          email: email,
          role: "user",
          isActive: true,
        },
        process.env.JWT_SECRET
      );

      res.status(200).json({ message: "Login successful", token: token });
    } catch (e) {
      res.status(500).json({ message: "Server error" });
    }
  }

  async getCurrentUser(req, res) {
    try {
      const id = req.user.id;
      const user = await this.repo.getItemById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ user });
    } catch (e) {
      res.status(500).json({ message: "Server error" });
    }
  }

  async updateCurrentUser(req, res) {
    try {
      const id = req.user.id;
      const updates = req.body;
      const user = await this.repo.getItemById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const updatedUser = this.repo.updateItemById(id, updates);
      res
        .status(200)
        .json({ message: "User updated successfully", user: updatedUser });
    } catch (e) {
      res.status(500).json({ message: "Server error" });
    }
  }
}

module.exports = UserController;
