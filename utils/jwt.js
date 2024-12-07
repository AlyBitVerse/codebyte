// Import necessary modules
const jwt = require("jsonwebtoken"); // JWT library
const crypto = require("crypto"); // For generating a secret key

// Constants
const SECRET_KEY_ENV_VAR = "JWT_SECRET"; // The environment variable name to store the secret key

const generateSecretKey = () => {
  // Generate a random 256-bit secret key (32 bytes)
  const secretKey = crypto.randomBytes(32).toString("hex");

  console.log("Generated secret key:", secretKey);
  return secretKey;
};

/**
 * Retrieves the secret key from environment variables or returns undefined if not found.
 * @returns {string|undefined} The secret key.
 */
const getSecretKey = () => {
  return process.env[SECRET_KEY_ENV_VAR];
};

/**
 * Signs data into a JWT token using the secret key.
 * @param {object} payload - The payload to be signed into the JWT token.
 * @param {string} secretKey - The secret key used to sign the token.
 * @param {object} options - Additional options such as expiration time.
 * @returns {string} The signed JWT token.
 */
const signToken = (payload, secretKey, options = {}) => {
  // Set a default expiration if none is provided
  const defaultOptions = {
    expiresIn: "1h", // Default expiration of 1 hour
    ...options, // Override with any options passed in
  };

  return jwt.sign(payload, secretKey, defaultOptions);
};

/**
 * Verifies the JWT token using the provided secret key.
 * @param {string} token - The JWT token to be verified.
 * @param {string} secretKey - The secret key used to verify the token.
 * @returns {object} The decoded payload if the token is valid, or an error if invalid.
 */
const verifyToken = (token, secretKey) => {
  try {
    const decoded = jwt.verify(token, secretKey); // Decode and verify the token
    return decoded; // Return the decoded payload if successful
  } catch (err) {
    throw new Error("Invalid token or expired token");
  }
};

/**
 * A helper function to check if the JWT token is expired.
 * @param {string} token - The JWT token to check.
 * @returns {boolean} True if the token is expired, otherwise false.
 */
const isTokenExpired = (token) => {
  try {
    const decoded = jwt.decode(token);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decoded.exp < currentTime;
  } catch (err) {
    return false; // Return false if the token is invalid or cannot be decoded
  }
};

/**
 * A helper function to get the decoded payload from a JWT token without verifying.
 * @param {string} token - The JWT token to decode.
 * @returns {object} The decoded payload (without verification).
 */
const decodeToken = (token) => {
  return jwt.decode(token);
};

// Export the functions
module.exports = {
  generateSecretKey,
  getSecretKey,
  signToken,
  verifyToken,
  isTokenExpired,
  decodeToken,
};
