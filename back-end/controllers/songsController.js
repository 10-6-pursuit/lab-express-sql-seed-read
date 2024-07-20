const express = require("express");
const songs = express.Router();
const { getAllSongs, getOneSong, createSong, deleteSong } = require("../queries/song");
const { checkAlbum, checkName, checkIsFavorite, checkTime, checkArtist} = require("../validations/checkSongs")

//INDEX 
songs.get("/", async (req, res) => {
    const allSongs = await getAllSongs();
    if(allSongs[0]){
        res.status(200).json(allSongs);
    } else {
        res.status(500).json({error: "server error"});
    };
});

//SHOW
songs.get("/:id", async (req, res) => {
    const { id } = req.params;
    const oneSong = await getOneSong(id);
    if(oneSong){
        res.status(200).json(oneSong);
    } else {
        res.status(404).json({error: "song not found"});
    }
});

//CREATE
songs.post("/", checkName, checkArtist, checkAlbum, checkTime, checkIsFavorite, async (req, res) => {
    const incomingSong = await createSong(req.body);
    res.status(201).json(incomingSong);
});

//DELETE
songs.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const removedSong = await deleteSong(id);
    if(removedSong){
        res.status(200).json(removedSong);
    } else {
        res.status(404).json({error: "song to remove not found"});
    };
});


module.exports = songs;