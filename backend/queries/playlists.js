const db = require("../db/db-config.js");

const createPlaylist = async (playlist) => {
  const { name } = playlist;
  try {
    const newPlaylist = await db.one(
      "INSERT INTO playlists (name) VALUES($1) RETURNING *",
      [name]
    );
    return newPlaylist;
  } catch (error) {
    throw error;
  }
};

const getAllPlaylists = async () => {
  try {
    const allPlaylists = await db.any("SELECT * FROM playlists");
    return allPlaylists;
  } catch (error) {
    throw error;
  }
};

const getPlaylist = async (id) => {
  try {
    const playlist = await db.one("SELECT * FROM playlists WHERE id=$1", id);
    const songs = await db.any(
      "SELECT s.* FROM songs s JOIN playlist_songs ps ON s.id = ps.song_id WHERE ps.playlist_id=$1",
      id
    );
    return { ...playlist, songs };
  } catch (error) {
    throw error;
  }
};

const addSongToPlaylist = async (playlistId, songId) => {
  try {
    await db.none(
      "INSERT INTO playlist_songs (playlist_id, song_id) VALUES($1, $2) ON CONFLICT DO NOTHING",
      [playlistId, songId]
    );
  } catch (error) {
    throw error;
  }
};

const removeSongFromPlaylist = async (playlistId, songId) => {
  try {
    await db.none(
      "DELETE FROM playlist_songs WHERE playlist_id=$1 AND song_id=$2",
      [playlistId, songId]
    );
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createPlaylist,
  getAllPlaylists,
  getPlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
};
