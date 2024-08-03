const express = require("express");
const songs = express.Router();

const {
  getAllSongs,
  getSong,
  createSong,
  deleteSong,
  updateSong,
  updateFavoriteStatus,
} = require("../queries/songs");

// INDEX
songs.get("/", async (req, res) => {
  const allSongs = await getAllSongs();
  if (allSongs[0]) {
    res.status(200).json(allSongs);
  } else {
    res.status(500).json({ error: "Error fetching all songs" });
  }
});

songs.get("/:id", async (req, res) => {
  const { id } = req.params;
  const song = await getSong(id);
  if (song) {
    res.json(song);
  } else {
    res.status(404).json({ error: `Song with id ${id} not found` });
  }
});

// CREATE
songs.post("/", async (req, res) => {
  const song = await createSong(req.body);
  res.json(song);
});

// DESTROY
songs.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedSong = await deleteSong(id);
  if (deletedSong.id) {
    res.status(200).json(deletedSong);
  } else {
    res.status(404).json("Song not found");
  }
});

// UPDATE
songs.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedSong = await updateSong(id, req.body);
  res.status(200).json(updatedSong);
});

// UPDATE FAVORITE STATUS
songs.put("/:id/favorite", async (req, res) => {
  const { id } = req.params;
  const { is_favorite } = req.body;

  try {
    const updatedSong = await updateFavoriteStatus(id, is_favorite);
    if (updatedSong) {
      res.status(200).json(updatedSong);
    } else {
      res.status(404).json({ error: `Song with id ${id} not found` });
    }
  } catch (error) {
    res.status(400).json({ error: "Error updating favorite status" });
  }
});

module.exports = songs;
