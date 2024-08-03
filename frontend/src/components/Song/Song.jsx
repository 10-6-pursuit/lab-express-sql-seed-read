import React, { useEffect, useState } from "react";
import "./Song.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getSong, deleteSong } from "../../utils/functions";

export default function Song() {
  const { id } = useParams();
  const [song, setSong] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const data = await getSong(id);
        setSong(data);
      } catch (error) {
        console.error("Failed to fetch song:", error);
      }
    };

    fetchSong();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteSong(id);
      navigate("/songs");
    } catch (error) {
      console.error("Failed to delete song:", error);
    }
  };

  return (
    <div className="song-container">
      <div className="song-container_song">
        {song && (
          <>
            <p>{song.is_favorite ? "★" : "☆"}</p>
            <h1>
              {song.name} - By {song.artist}
            </h1>
            <h3>{song.album}</h3>
            <h4>Time: {song.time}</h4>
          </>
        )}
      </div>
      <div className="song-container_buttons">
        <Link to="/songs">Back</Link>
        <Link to={`/songs/${id}/edit`}>Edit</Link>
        <button onClick={() => setConfirmDelete(true)}>Delete</button>
        {confirmDelete && (
          <div className="confirmDelete">
            <h3>Are you sure that you want to delete this song?</h3>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={() => setConfirmDelete(false)}>No</button>
          </div>
        )}
      </div>
    </div>
  );
}
