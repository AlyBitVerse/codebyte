import { verifyToken } from "../utils/jwt";

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token)
    return res.status(401).json({ message: "No token provided, unauthorized" });

  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    // If token is invalid or expired, return an error
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

const roleMiddleware = (requiredRoles = []) => {
  return (req, res, next) => {
    const user = req.user;
    if (!user)
      return res.status(401).json({ message: "Unauthorized: No user found" });

    // Check if the user has the required role(s)
    if (requiredRoles.length && !requiredRoles.includes(user.role)) {
      return res.status(403).json({
        message: "Forbidden: You do not have the required permissions",
      });
    }
    next();
  };
};

module.exports = {
  authMiddleware,
  roleMiddleware,
};
