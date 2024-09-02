const express = require("express");
const router = express.Router();


const { getAllSongs, getSong, createSong, deleteSong, updateSong} = require("../queries/songs");



//SHOW  all songs
router.get("/", async (req, res) => {
    const allSongs = await getAllSongs();
    if (allSongs[0]) {
      res.status(200).json(allSongs);
    } else {
      res.status(500).json({ error: "server error" });
    }
  });

  // SHOW one song
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const song = await getSong(id);
    if (song) {
      res.json(song);
    } else {
      res.status(404).json({ error: "not found" });
    }
  });
  

  router.post("/", async (req, res) => {
    try {
      const song = await createSong(req.body);
      res.json(song);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  });

  // DELETE one song

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const deletedSong = await deleteSong(id);
    if (deletedSong.id) {
      res.status(200).json(deletedSong);
    } else {
      res.status(404).json("Car not found");
    }
  });

  // UPDATE one song

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updatedSong= await updateSong(id, req.body);
    res.status(200).json(updatedSong);
  });
  
  




  module.exports = router;