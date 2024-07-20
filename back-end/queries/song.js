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
        return oneSong
    } catch (error) {
        return error
    }
}

module.exports = { getAllSongs, getSong };