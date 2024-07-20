const db = require("../db/dbConfig");

const getAllSongs = async () => {
    try {
        const allSongs = await db.any("SELECT * FROM songs");
        return allSongs;
    } catch(error) {
        return error;
    };
};

const getOneSong = async (id) => {
    try {
        const oneSong = await db.one("SELECT * FROM songs WHERE id=$1", id);
        return oneSong;
    } catch (error) {
        return error;
    };
};

const createSong = async (song) => {
    const {name, artist, album, time, is_favorite} = song;
    try {
        const newSong = await db.one(
            "INSERT INTO songs (name, artist, album, time, is_favorite) VALUES ($1, $2, $3, $4, $5) RETURNING *", [name, artist, album, time,is_favorite]
        );
        return newSong;
    } catch (error){
        return error;
    };
};

const deleteSong = async (id) => {
    try {
        const removedSong = await db.one("DELETE FROM songs WHERE id=$1 RETURNING *", id);
        return removedSong;
    } catch (error) {
        return error;
    };
};

const updateSong = async (id, songUpdate) => {
    const {name, artist, album, time, is_favorite} = songUpdate;
    try {
        const updatedSong = await db.one("UPDATE songs SET name=$1, artist=$2, album=$3, time=$4, is_favorite=$5 WHERE id=$6 RETURNING *", [name, artist, album, time, is_favorite, id]);
        return updatedSong;
    } catch (error) {
        throw error;
    };
};

module.exports = { getAllSongs, getOneSong, createSong, deleteSong, updateSong };