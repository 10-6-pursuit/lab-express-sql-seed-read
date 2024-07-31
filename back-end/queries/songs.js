const db = require("../db/db-config.js");

const getAllSongs = async () => {
  try {
    const allSongs = await db.any("SELECT * FROM songs ");
    console.log(allSongs);
    return allSongs;
  } catch (error) {
    return error;
  }
};

const getSong = async (id) => {
  try {
    const oneSong = await db.one("SELECT * FROM songs WHERE id=$1", id);
    return oneSong;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getSong,
  getAllSongs,
};
