const BaseRepository = require("./baseRepo");
const User = require("../models/User");

class UserRepository extends BaseRepository {
  constructor() {
    super("users");
  }
  async getUserByEmail(email) {
    try {
      const users = await this.getAllItems();
      return users.find((user) => user.email === email);
    } catch (error) {
      console.error(
        "ERROR (UserRepo):",
        `Error getting user by email: ${email}`,
        error
      );
      throw error;
    }
  }
  async userExistsByEmail(email) {
    const users = await this.getAllItems();
    return users.some((user) => user.email === email);
  }
}

module.exports = UserRepository;

const userRepo = new UserRepository();

async function test() {
  console.log("\nTesting createUser fn..");
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

  dummyUsers.forEach(async (user) => {
    await userRepo.createItem(user);
  });

  console.log("\nTesting getAllUsers fn..");
  await userRepo
    .getAllItems()
    .then((users) =>
      users.forEach((user) => console.log("id:", user.id, user.username))
    );

  console.log("\nTesting getUserById fn..");
  await userRepo
    .getItemById(2)
    .then((user) => console.log(user.username, "rank:", user.rank));

  console.log("\nTesting getUserByEmail fn..");
  await userRepo
    .getUserByEmail("user.susan@example.com")
    .then((user) => console.log(user.username, "rank:", user.rank));

  console.log("\nTesting updateUserById fn..");
  userRepo.updateItemById(3, { username: "emao", rank: 3 });
  userRepo.updateItemById(1, { username: "alpha", rank: 7 });
  await userRepo.updateItemById(2, { username: "shero", rank: 4 });

  console.log("\nTesting deleteUserById fn..");
  await userRepo.deleteItemById(4);

  console.log("\nTesting userExistsById fn..");
  const someId = 4;
  const existsById = await userRepo.userExistsById(someId);
  console.log(`User with id(${someId}) exists ->`, existsById);

  console.log("\nTesting userExistsByEmail fn..");
  const someEmail = "mod.alex@example.com";
  const existsByEmail = await userRepo.userExistsByEmail(someEmail);
  console.log(`User with email(${someEmail}) exists ->`, existsByEmail);

  // console.log("\nTesting clearRepository fn..");
  // userRepo.clearRepository();
}

// test();
