const express = require("express");
const {
  getAllSongs,
  getSongById,
  createSong,
  updateSongById,
  deleteSongById,
} = require("../controllers/songController");

const router = express.Router();

router.get("/", getAllSongs);
router.get("/:id", getSongById);
router.post("/", createSong);
router.put("/:id", updateSongById);
router.delete("/:id", deleteSongById);

module.exports = router;
