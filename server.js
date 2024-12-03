// 3d Party Modules
const express = require("express");
const cors = require("cors");

// Standard Modules
const path = require("path");

// Local Imports
// ...

// Constants
const PORT = 8000;
const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'public','pages', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
})

