// Dependencies
const cors = require("cors");
const express = require("express");

// Configuration
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Controllers
// const songsController = require("./controllers/songController.js")
const artistsController = require("./controllers/artistsController.js")


// Health Check Route
app.get("/", (req, res) => {
    res.send("Welcome to Youtunes");
})

// app.use("/songs", songsController);
app.use("/artists", artistsController);

// 404 page
app.get("*", (req, res) => {
    res.status(404).send("Page not found");
})

// Export
module.exports = app;