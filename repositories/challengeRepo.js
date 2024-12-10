const BaseRepository = require("./baseRepo");
const User = require("../models/User");
const Challenge = require("../models/Challenge");

class ChallengeRepository extends BaseRepository {
  constructor() {
    super("challenges");
  }
}

module.exports = ChallengeRepository;

const challengeRepo = new ChallengeRepository();

async function test() {
  console.log("\nTesting createChallenge fn..");
  const dummChallenges = [
    new Challenge(
      1,
      "creator1",
      "Reverse String",
      "Write a function that reverses a given string.",
      "function reverseString(str) { return str.split('').reverse().join(''); }",
      "easy",
      "function reverseString(str) { return str.split('').reverse().join(''); }",
      "pending",
      new Date(),
      null,
      null,
      [
        { input: "hello", expectedOutput: "olleh" },
        { input: "world", expectedOutput: "dlrow" },
      ],
      {
        user1: { attempts: 2, successful: true },
        user2: { attempts: 1, successful: false },
      }
    ),
    new Challenge(
      2,
      "creator2",
      "Palindrome Check",
      "Create a function to check if a string is a palindrome.",
      "function isPalindrome(str) { return str === str.split('').reverse().join(''); }",
      "medium",
      "function isPalindrome(str) { return str === str.split('').reverse().join(''); }",
      "pending",
      new Date(),
      null,
      null,
      [
        { input: "madam", expectedOutput: true },
        { input: "hello", expectedOutput: false },
      ],
      {
        user1: { attempts: 3, successful: true },
        user3: { attempts: 1, successful: false },
      }
    ),
    new Challenge(
      3,
      "creator3",
      "Find Prime Numbers",
      "Write a function to find prime numbers up to a given number.",
      "function findPrimes(limit) { /* implementation here */ }",
      "hard",
      "function findPrimes(limit) { /* implementation here */ }",
      "approved",
      new Date(),
      new Date(),
      "admin1",
      [
        { input: 10, expectedOutput: [2, 3, 5, 7] },
        { input: 20, expectedOutput: [2, 3, 5, 7, 11, 13, 17, 19] },
      ],
      {
        user2: { attempts: 1, successful: true },
        user4: { attempts: 2, successful: false },
      }
    ),
    new Challenge(
      4,
      "creator4",
      "Fibonacci Sequence",
      "Generate the first n Fibonacci numbers.",
      "function fibonacci(n) { /* implementation here */ }",
      "easy",
      "function fibonacci(n) { /* implementation here */ }",
      "pending",
      new Date(),
      null,
      null,
      [
        { input: 5, expectedOutput: [0, 1, 1, 2, 3] },
        { input: 8, expectedOutput: [0, 1, 1, 2, 3, 5, 8, 13] },
      ],
      {
        user3: { attempts: 1, successful: true },
        user5: { attempts: 3, successful: false },
      }
    ),
    new Challenge(
      5,
      "creator5",
      "Sort Array",
      "Implement an algorithm to sort an array of numbers in ascending order.",
      "function sortArray(arr) { return arr.sort((a, b) => a - b); }",
      "medium",
      "function sortArray(arr) { return arr.sort((a, b) => a - b); }",
      "approved",
      new Date(),
      new Date(),
      "admin2",
      [
        { input: [5, 3, 8, 1], expectedOutput: [1, 3, 5, 8] },
        { input: [12, 11, 15, 10], expectedOutput: [10, 11, 12, 15] },
      ],
      {
        user4: { attempts: 2, successful: true },
        user1: { attempts: 1, successful: false },
      }
    ),
  ];

  dummChallenges.forEach(async (challenge) => {
    await challengeRepo.createItem(challenge);
  });

  console.log("\nTesting getAllChallenges fn..");
  await challengeRepo
    .getAllItems()
    .then((challenges) =>
      challenges.forEach((challenge) =>
        console.log("id:", challenge.id, challenge.creatorID)
      )
    );

  console.log("\nTesting getChallengeById fn..");
  await challengeRepo
    .getItemById(2)
    .then((challenge) =>
      console.log(challenge.difficulty, "rank:", challenge.instructions)
    );

  console.log("\nTesting updateChallengeById fn..");
  challengeRepo.updateItemById(3, {
    approvedBy: "emao",
    approvedAt: new Date(),
  });
  challengeRepo.updateItemById(1, {
    username: "alpha",
    approvedAt: new Date(),
  });
  await challengeRepo.updateItemById(2, {
    username: "shero",
    approvedAt: new Date(),
  });

  console.log("\nTesting deleteChallengeById fn..");
  await challengeRepo.deleteItemById(4);

  console.log("\nTesting challengeExistsById fn..");
  const someId = 4;
  const existsById = await challengeRepo.itemExistsById(someId);
  console.log(`Challenge with id(${someId}) exists ->`, existsById);

  // console.log("\nTesting clearRepository fn..");
  // challengeRepo.clearRepository();
}

test();

// Create Challenge Model
// Add any required methods to the model or to the repo
// Write the logic for authController
// Continue the rest of the controllers logic
