const express = require("express");
const songs = express.Router({ mergeParams: true });
const { getAllSongs, getSong, addSong, deleteSong, updateSong, getAscSongs, getDescSongs, getFavSongs, getNotFavSongs } = require("../queries/songs.js");
const { checkName, checkArtist, checkBoolean } = require("../validations/checkSongs.js")

const { getArtist } = require("../queries/artists.js")

songs.get("/", async (req, res) => {
    const { artist_id } = req.params
    const artist = await getArtist(artist_id)
    let listOfSongs = await getAllSongs(artist_id);
    switch (req.query.order) {
        case "asc":
        listOfSongs = await getAscSongs();
        break;
        case "desc":
        listOfSongs = await getDescSongs();
        break;
    }
    switch (req.query.is_favorite) {
        case "true":
        listOfSongs = await getFavSongs();
        break;
        case "false":
        listOfSongs = await getNotFavSongs();
        break;
    }
    if (artist.id)  {
        res.status(200).json({...artist, listOfSongs});
    } else {
        res.status(500).json({ error: "server error"});
    }
})

// Show Individual Song Route
songs.get("/:id", async (req, res) => {
    const { artist_id, id } = req.params;
    const song = await getSong(artist_id, id);
    const artist = await getArtist(artist_id)
    if (song.received === 0) {
        res.status(404).send("Page not found");
    } else if (song) {
        res.status(200).json({...artist, song});
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