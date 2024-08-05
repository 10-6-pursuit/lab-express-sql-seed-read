const {
  createPlaylist,
  getAllPlaylists,
  getPlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
} = require("../queries/playlists");

// CREATE Playlist
const createPlaylist = async (req, res) => {
  try {
    const playlist = await createPlaylist(req.body);
    res.status(201).json(playlist);
  } catch (error) {
    res.status(500).json({ error: "Error creating playlist" });
  }
};

// INDEX Playlists
const getAllPlaylists = async (req, res) => {
  try {
    const playlists = await getAllPlaylists();
    res.status(200).json(playlists);
  } catch (error) {
    res.status(500).json({ error: "Error fetching playlists" });
  }
};

// SHOW Playlist
const getPlaylist = async (req, res) => {
  const { id } = req.params;
  try {
    const playlist = await getPlaylist(id);
    res.status(200).json(playlist);
  } catch (error) {
    res.status(404).json({ error: `Playlist with id ${id} not found` });
  }
};

// ADD Song to Playlist
const addSongToPlaylist = async (req, res) => {
  const { playlistId, songId } = req.body;
  try {
    await addSongToPlaylist(playlistId, songId);
    res.status(200).json({ message: "Song added to playlist" });
  } catch (error) {
    res.status(500).json({ error: "Error adding song to playlist" });
  }
};

// REMOVE Song from Playlist
const removeSongFromPlaylist = async (req, res) => {
  const { playlistId, songId } = req.body;
  try {
    await removeSongFromPlaylist(playlistId, songId);
    res.status(200).json({ message: "Song removed from playlist" });
  } catch (error) {
    res.status(500).json({ error: "Error removing song from playlist" });
  }
};

module.exports = {
  createPlaylist,
  getAllPlaylists,
  getPlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
};
