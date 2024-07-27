const db = require("../db/dbConfig");

const getAllSongs = async (req, res) => {
  try {
    const songs = await db.any("SELECT * FROM songs");
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const createSong = async (req, res) => {
  const { name, artist, album, time, is_favorite } = req.body;

  if (!name || !artist || typeof is_favorite !== "boolean") {
    return res
      .status(400)
      .json({ error: "Name, artist, and is_favorite are required" });
  }

  try {
    const newSong = await db.one(
      "INSERT INTO songs(name, artist, album, time, is_favorite) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [name, artist, album || null, time || null, is_favorite]
    );
    res.status(201).json(newSong);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getSongById = async (req, res) => {
  const { id } = req.params;

  try {
    const song = await db.oneOrNone("SELECT * FROM songs WHERE id = $1", [id]);
    if (!song) {
      return res.status(404).json({ error: "Song not found" });
    }
    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateSongById = async (req, res) => {
  const { id } = req.params;
  const { name, artist, album, time, is_favorite } = req.body;

  if (!name || !artist || typeof is_favorite !== "boolean") {
    return res
      .status(400)
      .json({ error: "Name, artist, and is_favorite are required" });
  }

  try {
    const updatedSong = await db.oneOrNone(
      `UPDATE songs SET name=$1, artist=$2, album=$3, time=$4, is_favorite=$5 WHERE id=$6 RETURNING *`,
      [name, artist, album || null, time || null, is_favorite, id]
    );
    if (!updatedSong) {
      return res.status(404).json({ error: "Song not found" });
    }
    res.status(200).json(updatedSong);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteSongById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSong = await db.oneOrNone(
      "DELETE FROM songs WHERE id = $1 RETURNING *",
      [id]
    );
    if (!deletedSong) {
      return res.status(404).json({ error: "Song not found" });
    }
    res.status(200).json(deletedSong);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllSongs,
  createSong,
  getSongById,
  updateSongById,
  deleteSongById,
};
