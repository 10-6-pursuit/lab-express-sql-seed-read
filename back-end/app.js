// Dependencies
const cors = require("cors");
const express = require("express");


// Configuration
const app = express();

// Controllers
const songsController = require("./controllers/songController.js")

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Route
app.get("/", (req, res) => {
    res.send("Welcome to Youtunes");
})

app.use("/songs", songsController);

// 404 page
app.get("*", (req, res) => {
    res.status(404).send("Page not found");
})


// Export
module.exports = app;