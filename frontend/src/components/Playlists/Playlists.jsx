import React, { useState, useEffect } from "react";
import {
  createPlaylist,
  getPlaylists,
  deletePlaylist,
} from "../../utils/playlistFetch";
import "./Playlists.css";

export default function Playlists() {
  const [name, setName] = useState("");
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
      <h2>Playlists</h2>
      <button onClick={() => setIsFormVisible(!isFormVisible)}>
        {isFormVisible ? "Cancel" : "Create Playlist"}
      </button>
      {isFormVisible && (
        <div className="playlist-form">
          <h3>Create New Playlist</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="playlist-name">
              Playlist Name:{" "}
              <input
                type="text"
                id="playlist-name"
                value={name}
                onChange={handleChange}
                required
              />
            </label>
            <button type="submit">Create Playlist</button>
          </form>
        </div>
      )}
      <div className="playlists-container_table">
        <div className="playlists-container_labels">
          <div>Playlist Name</div>
          <div>Actions</div>
        </div>
        {playlists.length > 0 ? (
          playlists.map((playlist) => (
            <div key={playlist.id}>
              <Link to={`/playlists/${playlist.id}`} className="transitional">
                <h3>{playlist.name}</h3>
              </Link>
              <button onClick={() => handleDelete(playlist.id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No playlists available</p>
        )}
      </div>
    </div>
  );
}
