import React, { useEffect, useState } from "react";
import { getSongs, updateSong } from "../../utils/functions";
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

  const handleFavorite = async (id, currentStatus) => {
    try {
      const updatedSong = await updateSong(id, { is_favorite: !currentStatus });
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
      <div className="songs-container_song labels">
        <h3>Fav</h3>
        <h3>Song</h3>
        <h3>Artist</h3>
        <h3>Time</h3>
      </div>
      {songs
        ? songs.map((song) => (
            <div key={song.id} className="songs-container_song list">
              <p onClick={() => handleFavorite(song.id, song.is_favorite)}>
                {song.is_favorite ? "★" : "☆"}
              </p>
              <Link to={`/${song.id}`}>
                <h3>{song.name}</h3>
              </Link>
              <h4>{song.artist}</h4>
              <p>{song.time}</p>
            </div>
          ))
        : "Loading..."}
    </div>
  );
}
