import React, { useEffect, useState } from "react";
import { getSongs, updateFavoriteStatus } from "../../utils/functions";
import { Link } from "react-router-dom";
import "./Songs.css";

export default function Songs() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const data = await getSongs();
        setSongs(data);
      } catch (error) {
        console.error("Failed to fetch songs:", error);
      }
    };

    fetchSongs();
  }, []);

  const handleFavToggle = async (id, currentStatus) => {
    try {
      const updatedSong = await updateFavoriteStatus(id, !currentStatus);
      setSongs((prevSongs) =>
        prevSongs.map((song) =>
          song.id === id
            ? { ...song, is_favorite: updatedSong.is_favorite }
            : song
        )
      );
    } catch (error) {
      console.error("Failed to update favorite status:", error);
    }
  };

  return (
    <div className="songs-container">
      <h1>Songs</h1>
      <div className="songs-container_table">
        <div className="songs-container_labels">
          <h3>Fav</h3>
          <h3>Song</h3>
          <h3>Artist</h3>
          <h3>Time</h3>
        </div>
        {songs.length > 0
          ? songs.map((song) => (
              <div key={song.id} className="songs-container_songs">
                <p onClick={() => handleFavToggle(song.id, song.is_favorite)}>
                  {song.is_favorite ? "★" : "☆"}
                </p>
                <Link to={`/songs/${song.id}`}>
                  <h3>{song.name}</h3>
                </Link>
                <h4>{song.artist}</h4>
                <p>{song.time}</p>
              </div>
            ))
          : "Loading..."}
      </div>
    </div>
  );
}
