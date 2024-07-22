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

// function to get songs in asc order
const getAscSongs = async () => {
    try {
        const ascSongs = await db.any("SELECT * FROM songs ORDER BY name ASC");
        return ascSongs;
    } catch (error) {
        return error;
    }
}

// function to get songs in desc order
const getDescSongs = async () => {
    try {
        const descSongs = await db.any("SELECT * FROM songs ORDER BY name DESC");
        return descSongs;
    } catch (error) {
        return error;
    }
}

// function to get all songs where value of is_favorite if true
const getFavSongs = async () => {
    try {
        const allFavSongs = await db.any("SELECT * FROM songs WHERE is_favorite = true");
        return allFavSongs;
    } catch (error) {
        return error;
    }
}

// function to get all songs where value of is_favorite if true
const getNotFavSongs = async () => {
    try {
        const allNotFavSongs = await db.any("SELECT * FROM songs WHERE is_favorite = false");
        return allNotFavSongs;
    } catch (error) {
        return error;
    }
}


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

// function to delete song from database
const deleteSong = async (id) => {
    try {
        const deletedSong = await db.one("DELETE FROM songs WHERE id = $1 RETURNING *", id);
        return deletedSong
    } catch (error) {
        return error
    }
}

// function to update song on database
const updateSong = async (id, song) => {
    try {
        const updatedSong = await db.one(
            "UPDATE songs SET is_favorite=$1 WHERE id=$2 RETURNING *",
            [song.is_favorite, id]
        );
        return updatedSong;
    } catch (error) {
        throw error;
    }
}

module.exports = { 
    getAllSongs, 
    getSong, 
    addSong, 
    deleteSong, 
    updateSong, 
    getAscSongs, 
    getDescSongs,
    getFavSongs,
    getNotFavSongs
};