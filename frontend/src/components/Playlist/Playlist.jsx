import React, { useState, useEffect } from "react";
import {
  createPlaylist,
  getPlaylists,
  deletePlaylist,
} from "../../utils/playlistFetch";
import "./Playlist.css";

export default function Playlist() {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const allPlaylists = await getPlaylists();
        setPlaylists(allPlaylists);
      } catch (error) {
        setError("Error fetching playlists. Please try again.");
      }
    };

    fetchPlaylists();
  }, []);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const newPlaylist = await createPlaylist({ name });
      setSuccess(`Playlist "${newPlaylist.name}" created successfully!`);
      setName("");
      const allPlaylists = await getPlaylists();
      setPlaylists(allPlaylists);
    } catch (error) {
      setError("Error creating playlist. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePlaylist(id);
      setPlaylists(playlists.filter((playlist) => playlist.id !== id));
    } catch (error) {
      setError("Error deleting playlist. Please try again.");
    }
  };

  return (
    <div className="playlist-container">
      <h2 className="playlist-heading">Playlists</h2>
      <button
        className="toggle-form-button"
        onClick={() => setIsFormVisible(!isFormVisible)}
      >
        {isFormVisible ? "Cancel" : "Create Playlist"}
      </button>
      {isFormVisible && (
        <div className="create-playlist-form">
          <h2>Create New Playlist</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="playlist-name">Playlist Name:</label>
              <input
                type="text"
                id="playlist-name"
                value={name}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Create Playlist</button>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
          </form>
        </div>
      )}
      <div className="playlists-table">
        <div className="playlists-header">
          <div>Playlist Name</div>
          <div>Actions</div>
        </div>
        {playlists.length > 0 ? (
          playlists.map((playlist) => (
            <div key={playlist.id} className="playlist-item">
              <div>{playlist.name}</div>
              <div>
                <button
                  className="playlist-delete-button"
                  onClick={() => handleDelete(playlist.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="playlists-loading">No playlists available</div>
        )}
      </div>
    </div>
  );
}
