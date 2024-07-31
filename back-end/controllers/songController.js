const express = require("express");
const songs = express.Router();

const { getAllSongs, getSong, createSong } = require("../queries/songs");

// INDEX
songs.get("/", async (req, res) => {
  const allSongs = await getAllSongs();
  if (allSongs[0]) {
    res.status(200).json(allSongs);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

songs.get("/:id", async (req, res) => {
  const { id } = req.params;
  const song = await getSong(id);

  if (song) {
    res.json(song);
  } else {
    res.status(404).json({ error: "not found" });
  }
});

// CREATE
songs.post("/", async (req, res) => {
  console.log(req.body);
  const song = await createSong(req.body);
  res.json(song);
});

module.exports = songs;
