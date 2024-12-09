const express = require("express");
const router = express.Router();

const serveHTML = require("../utils/helper");
router.get("/challenge", serveHTML("challenge"));

router.get("/challenges", serveHTML("challenges"));

router.get("/profile", serveHTML("profile"));

router.get("/auth", serveHTML("auth"));

router.use("*", (req, res) => {
  res.status(404);
  res.send("<h1>Page Not Available :( </h1>");
  // Maybe also send a file 404 page
});
module.exports = router;
