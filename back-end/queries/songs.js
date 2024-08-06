const db = require("../db/dbConfig.js");

// function to get all songs
const getEverySongInDataBase = async() => {
    try {
        const everySong = await db.any("SELECT * FROM songs");
        return everySong;
    } catch (error) {
        return error;
    }
}

const getAllSongs = async (artist_id) => {
    try {
        const allSongs = await db.any("SELECT * FROM songs WHERE artist_id=$1", artist_id);
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
const getSong = async (artistID,id) => {
    try {
        const oneSong = await db.oneOrNone("SELECT * FROM songs WHERE id=$1 AND artist_id=$2", [id, artistID]);
        return oneSong;
    } catch (error) {
        return error;
    }
};

// function to add song to table/database
const addSong = async (song) => {
    try {
        const newSong = await db.oneOrNone(
            "INSERT INTO songs (name, artist, album, time, img_url, vid_url, is_favorite) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", 
        [song.name, song.artist, song.album, song.time, song.img_url, song.vid_url.slice(-11), song.is_favorite]
        )
        return newSong;
    } catch (error) {
        return error;
    }
}

// function to delete song from database
const deleteSong = async (id) => {
    try {
        const deletedSong = await db.oneOrNone("DELETE FROM songs WHERE id = $1 RETURNING *", id);
        return deletedSong
    } catch (error) {
        return error
    }
}

// function to update song on database
const updateSong = async (id, song) => {
    try {
        const updatedSong = await db.oneOrNone(
            "UPDATE songs SET name=$1, artist=$2, album=$3, time=$4, img_url=$5, vid_url=$6, is_favorite=$7 WHERE id=$8 RETURNING *",
            [song.name, song.artist, song.album, song.time, song.img_url, song.vid_url, song.is_favorite, id]
        );
        return updatedSong;
    } catch (error) {
        throw error;
    }
}

module.exports = { 
    getAllSongs,
    getEverySongInDataBase, 
    getSong, 
    addSong, 
    deleteSong, 
    updateSong, 
    getAscSongs, 
    getDescSongs,
    getFavSongs,
    getNotFavSongs
};