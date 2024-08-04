const db = require("../db/dbConfig.js");

const getAllArtists = async () => {
  try {
    const allArtists = await db.any("SELECT * FROM artists");
    return allArtists;
  } catch (error) {
    return error;
  }
};
const getArtist = async ( id ) => {
  try {
    const oneArtist = await db.oneOrNone("SELECT * FROM artists WHERE id=$1", id);
    return oneArtist;
  } catch (error) {
    return error;
  }
};

const createArtist = async ( artist ) => {
  try {
    const newArtist = await db.oneOrNone(
      "INSERT INTO artists (name, website_url, img_url, main_genre, is_favorite) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [artist.name, artist.website_url, artist.main_genre, artist.is_favorite]
    );
    return newArtist;
  } catch (error) {
    return error;
  }
};

const deleteArtist = async ( id ) => {
  try {
    const deletedArtist = await db.oneOrNone(
      "DELETE FROM artists WHERE id = $1 RETURNING *", id);
    return deletedArtist;
  } catch (error) {
    return error;
  }
};

const updateArtist = async ( id, artist ) => {
  try {
    const updatedArtist = await db.oneOrNone(
      "UPDATE bookmarks SET name=$1, website_url=$2, img_url=$3, main_genre=$4, is_favorite=$5 where id=$6 RETURNING *",
      [artist.name, artist.website_url, artist.img_url, artist.main_genre, artist.is_favorite, id]
    );
    return updatedArtist;
  } catch (error) {
    return error;
  }
};

module.exports = {
    getAllArtists,
    getArtist,
    createArtist,
    deleteArtist,
    updateArtist,
};