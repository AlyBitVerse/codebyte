// 3d Party Modules
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// Configure env variables
const env = require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "dev"}.local`,
});

if (env.error) throw Error("Environment file is missing...");

// Standard Modules
const path = require("path");

// Local Imports
const publicRoutes = require("./routes/public");
const protectedRoutes = require("./routes/protected");
const adminRoutes = require("./routes/admin");
const viewRoutes = require("./routes/views");

// Constants
const PORT = process.env.PORT || 3000;
const app = express();
const publicPath = path.join(__dirname, process.env.STATIC_PATH || "public");
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // Allow cookies
  })
);
// For form submissions
app.use(express.urlencoded({ extended: false }));

// For regular requests
app.use(express.json());

app.use(express.static(publicPath));

app.use(viewRoutes);

app.use("/api", publicRoutes);
app.use("/api", protectedRoutes);
app.use("/api/admin", adminRoutes);

app.use("*", (req, res) => {
  res.status(404).send("<h1>404 Page Not Found :(</h1>");
  // Maybe also send a file 404 page
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
  console.log(`Visit http://localhost:${PORT}`);
});
