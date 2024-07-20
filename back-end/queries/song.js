const db = require("../db/dbConfig.js");


// function to get all songs
const getAllSongs = async () => {
    try {
        const allSongs = await db.any("SELECT * FROM songs");
        return allSongs;
    } catch (error) {
        return error;
    }
};

// function to get a single song with id
const getSong = async (id) => {
    try {
        const oneSong = await db.one("SELECT * FROM songs WHERE id=$1", id);
        return oneSong;
    } catch (error) {
        return error;
    }
};

// function to add song to table/database
const addSong = async (song) => {
    try {
        const newSong = await db.one(
            "INSERT INTO songs (name, artist, album, time, is_favorite) VALUES ($1, $2, $3, $4, $5) RETURNING *", 
        [song.name, song.artist, song.album, song.time, song.is_favorite]
        )
        return newSong;
    } catch (error) {
        return error;
    }
}

module.exports = { getAllSongs, getSong, addSong };