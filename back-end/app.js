// Dependencies
const cors = require("cors");
const express = require("express");

// Configuration
const app = express();

const { getEverySongInDataBase } = require("./queries/songs.js")

// Middleware
app.use(cors());
app.use(express.json());

// Controllers
// const songsController = require("./controllers/songsController.js")
const artistsController = require("./controllers/artistsController.js")


// Health Check Route
app.get("/", (req, res) => {
    res.send("Welcome to Youtunes");
})

// Index All Songs Route
app.get("/allsongs", async (req, res) => {
    const everySong = await getEverySongInDataBase();
    if(everySong[0]) {
        res.status(200).json(everySong)
    } else {
        res.status(500).json({ error: "server error"});
    }
})

// app.use("/songs", songsController);
app.use("/artists", artistsController);

// 404 page
app.get("*", (req, res) => {
    res.status(404).send("Page not found");
})

// Export
module.exports = app;