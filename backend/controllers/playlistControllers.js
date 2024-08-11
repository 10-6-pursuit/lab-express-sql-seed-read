const express = require("express");
const playlists = express.Router();

const {
  createPlaylist,
  getAllPlaylists,
  getPlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
} = require("../queries/playlists");

// INDEX
playlists.get("/", async (req, res) => {
  try {
    const allPlaylists = await getAllPlaylists();
    if (allPlaylists.length) {
      res.status(200).json(allPlaylists);
    } else {
      res.status(404).json({ error: "No playlists found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching playlists" });
  }
});

// SHOW
playlists.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const playlist = await getPlaylist(id);
    if (playlist) {
      res.status(200).json(playlist);
    } else {
      res.status(404).json({ error: `Playlist with id ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching playlist" });
  }
});

// CREATE
playlists.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    if (!name) {
      res.status(400).json({ error: "Playlist name is required" });
    } else {
      const playlist = await createPlaylist(req.body);
      res.status(201).json(playlist);
    }
  } catch (error) {
    res.status(500).json({ error: "Error creating playlist" });
  }
});

// ADD Song to Playlist
playlists.post("/:id/songs", async (req, res) => {
  const { id } = req.params;
  const { songId } = req.body;
  try {
    if (!songId) {
      res.status(400).json({ error: "Song ID is required" });
    } else {
      await addSongToPlaylist(id, songId);
      res.status(200).json({ message: "Song added to playlist" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error adding song to playlist" });
  }
});

// REMOVE Song from Playlist
playlists.delete("/:id/songs", async (req, res) => {
  const { id } = req.params;
  const { songId } = req.body;
  try {
    if (!songId) {
      res.status(400).json({ error: "Song ID is required" });
    } else {
      await removeSongFromPlaylist(id, songId);
      res.status(200).json({ message: "Song removed from playlist" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error removing song from playlist" });
  }
});

module.exports = playlists;
