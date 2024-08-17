import React, { useState } from "react";
import { createPlaylist } from "../../utils/playlistFetch";
import "./Playlist.css";

export default function Playlist() {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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
    } catch (error) {
      setError("Error creating playlist. Please try again.");
    }
  };

  return (
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
  );
}
