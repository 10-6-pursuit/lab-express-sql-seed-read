// DEPENDENCIES
const cors = require("cors");
const express = require("express");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

const songs = require("./controllers/songController.js");
app.use("/songs", songs);

const playlistsRouter = require("./controllers/playlistControllers");
app.use("/playlists", playlistsRouter);

// ROUTES
app.get("/", (req, res) => res.send("Welcome to Tuner"));

// 404 PAGE
app.get("*", (req, res) => res.status(404).send("Page not found"));

// EXPORT
module.exports = app;
