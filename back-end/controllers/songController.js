const express = require("express");
const songs = express.Router();
const { getAllSongs, getSong, addSong } = require("../queries/song");

// Index All Songs Route
songs.get("/", async (req, res) => {
    const allSongs = await getAllSongs();
    if (allSongs[0]) {
        res.status(200).json(allSongs);
    } else {
        res.status(500).json({ error: "server error"});
    }
})

// Show Individual Song Route
songs.get("/:id", async (req, res) => {
    const { id } = req.params;
    const song = await getSong(id);
    if (song) {
        res.status(200).json(song);
    } else {
        res.status(404).json({ error: "not found" });
    }
});

// Add Song Route
songs.post("/", async (req, res) => {
    const song = await addSong(req.body);
    console.log(req.body)
    res.json(song)
})

module.exports = songs;