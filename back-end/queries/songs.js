const db = require("../db/db-config.js");

const getAllSongs = async () => {
  try {
    const allSongs = await db.any("SELECT * FROM songs ");
    console.log(allSongs);
    return allSongs;
  } catch (error) {
    return "Error fetching all songs", error;
  }
};

const getSong = async (id) => {
  try {
    const oneSong = await db.one("SELECT * FROM songs WHERE id=$1", id);
    return oneSong;
  } catch (error) {
    return "Error finding song", error;
  }
};

const createSong = async (song) => {
  const { name, artist, album, time, is_favorite } = song;

  try {
    const newSong = await db.one(
      "INSERT INTO songs (name, artist, album, time, is_favorite) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [name, artist, album, time, is_favorite]
    );
    return newSong;
  } catch (error) {
    throw ("Error creating new song", error);
  }
};

module.exports = {
  getSong,
  getAllSongs,
  createSong,
};
