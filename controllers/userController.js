const UserRepository = require("../repositories/userRepo");
const User = require("../models/User");
const { uid } = require("uid");
const bcrypt = require("bcrypt");
const { signToken } = require("../utils/jwt");

class UserController {
  static #repo = new UserRepository();
  static validUserFields = ["username", "name", "email", "password"];

  /** 
   @Public
   */
  async createUser(req, res) {
    const { name, username, email, password, accessKey } = req.body;

    // Check for required fields
    if (!name || !email || !username || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if user already exists by email
    if (await UserController.#repo.userExistsByEmail(email)) {
      return res
        .status(409)
        .json({ message: "A user with the same email already exists" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Password validation
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    // Username validation
    if (!username || username.length < 3 || username.length > 15) {
      return res
        .status(400)
        .json({ message: "Username must be between 3 and 15 characters long" });
    }

    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
      return res.status(400).json({
        message: "Username can only contain letters, numbers, and underscores",
      });
    }

    // Generate UID and hash password
    const userID = uid(16);
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = new User(
        userID,
        username,
        name,
        email,
        hashedPassword,
        accessKey === process.env.ACCESS_KEY ? "admin" : "user"
      );
      await UserController.#repo.createItem(user);
      res.status(201).json({ message: "User created successfully" });
    } catch (e) {
      res.status(500).json({ message: "Server error", error: e.message });
    }
  }

  /** 
   @Public
   */
  async loginUser(req, res) {
    const { username, email, password } = req.body;

    // Check for required fields
    if ((!email && !username) || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Handle login with email
    if (email && !(await UserController.#repo.userExistsByEmail(email))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Handle login with username (To be implemented)
    if (
      username &&
      !(await UserController.#repo.userExistsByUsername(username))
    ) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Retrieve user based on email (or username)
    const user = email
      ? await UserController.#repo.getUserByEmail(email)
      : await UserController.#repo.getUserByUsername(username);

    // Password validation
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    try {
      const token = signToken(
        {
          id: user.id,
          username: user.username,
          email,
          role: user.role,
          isActive: true,
        },
        process.env.JWT_SECRET
      );

      res.status(200).json({ message: "Login successful", token: token });
    } catch (e) {
      res.status(500).json({ message: "Server error", error: e.message });
    }
  }

  /** 
   @Protected
   */
  async getCurrentUser(req, res) {
    try {
      const user = await UserController.#repo.getItemById(req.user.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const instance = User.fromJSON(user);
      res.status(200).json({ user: instance.toJSON(false) }); // Don't include password in response
    } catch (e) {
      res.status(500).json({ message: "Server error", error: e.message });
    }
  }

  /** 
   @Protected
   */
  async updateCurrentUser(req, res) {
    try {
      const id = req.user.id;
      const updates = req.body;

      const invalidFields = Object.keys(updates).filter(
        (key) => !UserController.validUserFields.includes(key)
      );

      if (invalidFields.length > 0) {
        return res.status(400).json({
          message: `Invalid fields: ${invalidFields.join(", ")}`,
        });
      }

      const user = await UserController.#repo.getItemById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const updatedUser = await UserController.#repo.updateItemById(
        id,
        updates
      );
      const instance = User.fromJSON(updatedUser);

      res.status(200).json({
        message: "User updated successfully",
        user: instance.toJSON(false), // Don't include password in response
      });
    } catch (e) {
      res.status(500).json({ message: "Server error", error: e.message });
    }
  }

  /** 
   @Admin
   */
  async getAllUsers(req, res) {
    try {
      // Check if the requesting user is an admin
      const admin = await UserController.#repo.getItemById(req.user.id);

      if (!admin) {
        return res
          .status(403)
          .json({ message: "You must be an admin to access this resource" });
      }

      const users = await UserController.#repo.getAllItems();
      res.status(200).json({ users });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Server error", error: e.message });
    }
  }

  /** 
   @Admin
   */
  async getUserById(req, res) {
    try {
      // Check if the requesting user is an admin
      const admin = await UserController.#repo.getItemById(req.user.id);

      if (!admin) {
        return res
          .status(403)
          .json({ message: "You must be an admin to access this resource" });
      }

      const targetUserExists = await UserController.#repo.itemExistsById(
        req.params.id
      );
      if (!targetUserExists)
        return res
          .status(404)
          .json({ message: `User not found with ID ${req.params.id}` });

      const user = await UserController.#repo.getItemById(req.params.id);
      res.status(200).json({ user });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Server error", error: e.message });
    }
  }

  /** 
   @Admin
   */
  async updateUserById(req, res) {
    try {
      // Check if the requesting user is an admin
      const admin = await UserController.#repo.getItemById(req.user.id);

      if (!admin) {
        return res
          .status(403)
          .json({ message: "You must be an admin to access this resource" });
      }

      const targetUserExists = await UserController.#repo.itemExistsById(
        req.params.id
      );
      if (!targetUserExists)
        return res
          .status(404)
          .json({ message: `User not found with ID ${req.params.id}` });

      const { createdAt, ...updateableData } = req.body;
      const updatedAt = new Date();
      const user = await UserController.#repo.updateItemById(req.params.id, {
        ...updateableData,
        updatedAt,
      });

      res.status(200).json({ message: "User updated successfully", user });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Server error", error: e.message });
    }
  }
}

module.exports = new UserController();