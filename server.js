// 3d Party Modules
const express = require("express");
const cors = require("cors");
// Configure env variables
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "dev"}.local`,
});

// Standard Modules
const path = require("path");

// Local Imports
// ...

// Constants
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cors());

app.use(
  express.static(path.join(__dirname, process.env.STATIC_PATH || "public"))
);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
  console.log(`Visit http://127.0.0.1:${PORT}`);
});
