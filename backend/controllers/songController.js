s

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
  try {
    const allSongs = await getAllSongs();
    if (allSongs.length) {
      res.status(200).json(allSongs);
    } else {
      res.status(404).json({ error: "No songs found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching all songs" });
  }
});

songs.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const song = await getSong(id);
    if (song) {
      res.status(200).json(song);
    } else {
      res.status(404).json({ error: `Song with id ${id} not found` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to search for song" });
  }
});

// CREATE
songs.post("/", async (req, res) => {
  const { name, artist } = req.body;
  try {
    if (!name || !artist) {
      res.status(400).json({ error: "Song and artist name are required" });
    } else {
      const song = await createSong(req.body);
      res.status(201).json(song);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating new song" });
  }
});

// UPDATE
songs.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, artist } = req.body;
  try {
    if (!name || !artist) {
      res.status(400).json({ error: "Song and artist name are required" });
    } else {
      const updatedSong = await updateSong(req.body, id);
      if (updatedSong) {
        res.status(200).json(updatedSong);
      } else {
        res.status(404).json({ error: "Failed to find song" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update song" });
  }
});

// DESTROY
songs.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedSong = await deleteSong(id);
    if (deletedSong) {
      res.status(200).json(deletedSong);
    } else {
      res.status(404).json({ error: "Song not found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the song" });
  }
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
    console.error(error);
    res.status(500).json({ error: "Error updating favorite status" });
  }
});

module.exports = songs;
