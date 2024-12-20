const { verifyToken } = require("../utils/jwt");

const authMiddleware =
  (redirect = true) =>
  (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      if (redirect) return res.redirect("/auth");
      else return next();
    }
    try {
      const decoded = verifyToken(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.redirect("/auth");
    }
  };

const notAuthenticatedMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (token) return res.redirect("/profile");
  next();
};

const roleMiddleware = (requiredRoles = []) => {
  return (req, res, next) => {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized: No user found" });

    if (requiredRoles.length && !requiredRoles.includes(user.role)) {
      return res.status(403).json({
        message: "Forbidden: You do not have the required permissions",
      });
    }
    next();
  };
};

module.exports = { authMiddleware, roleMiddleware, notAuthenticatedMiddleware };
