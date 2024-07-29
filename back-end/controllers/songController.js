const express = require("express");
const songs = express.Router();
const { getAllSongs, getSong, addSong, deleteSong, updateSong, getAscSongs, getDescSongs, getFavSongs, getNotFavSongs } = require("../queries/song");
const { checkName, checkArtist, checkBoolean } = require("../validations/checkSongs.js")

// Index All Songs Route
songs.get("/", async (req, res) => {
    let listOfSongs;
    switch (req.query.order) {
        case "asc":
        listOfSongs = await getAscSongs();
        break;
        case "desc":
        listOfSongs = await getDescSongs();
        break;
        default:
        listOfSongs = await getAllSongs();
    }
    switch (req.query.is_favorite) {
        case "true":
        listOfSongs = await getFavSongs();
        break;
        case "false":
        listOfSongs = await getNotFavSongs();
        break;
        default:
        listOfSongs = await getAllSongs();
    }
    if (listOfSongs[0])  {
        res.status(200).json(listOfSongs);
    } else {
        res.status(500).json({ error: "server error"});
    }
    // if ( order === "asc") {
    //     const ascSongs = await getAscSongs();
    //     if (ascSongs[0]) {
    //         res.status(200).json(ascSongs);
    //     } else {
    //         res.status(500).json({ error: "server error"});
    //     }
    // }

    // const allSongs = await getAllSongs();
    // if (allSongs[0]) {
    //     res.status(200).json(allSongs);
    // } else {
    //     res.status(500).json({ error: "server error"});
    // }
})

// Show Individual Song Route
songs.get("/:id", async (req, res) => {
    const { id } = req.params;
    console.log(req.params)
    const song = await getSong(id);
    if (song.received === 0) {
        res.status(404).send("Page not found");
    } else if (song) {
        res.status(200).json(song);
    } else {
        res.status(404).json({ error: "not found" });
    }
});

// Add Song Route
songs.post("/", checkName, checkArtist, checkBoolean, async (req, res) => {
    const song = await addSong(req.body);
    res.json(song)
})

// Delete Song Route
songs.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const deletedSong = await deleteSong(id);
    if (deletedSong.id) {
        res.status(200).json(deletedSong);
    } else {
        res.status(404).json("Song not found")
    }
})

// Update Song Route
songs.put("/:id", checkBoolean, async (req, res) => {
    const { id } = req.params;
    try {
        const updatedSong = await updateSong(id, req.body);
        res.status(200).json(updatedSong);
    } catch (error) {
        res.status(404).json("Song not found");
    }
})

module.exports = songs;