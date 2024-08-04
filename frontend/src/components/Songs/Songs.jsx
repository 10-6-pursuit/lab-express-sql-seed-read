import React, { useEffect, useState } from "react";
import {
  getSongs,
  updateFavoriteStatus,
  songSort,
} from "../../utils/functions";
import { Link } from "react-router-dom";
import "./Songs.css";

export default function Songs() {
  const [songs, setSongs] = useState([]);
  const [sortMethod, setSortMethod] = useState("dateAdded-asc");

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

  useEffect(() => {
    const sortedSongs = [...songs];
    songSort(sortedSongs, sortMethod);
    setSongs(sortedSongs);
  }, [sortMethod]);

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
      <h1 className="songs-container_heading">Songs</h1>
      <p className="songs-container_heading">
        Click on star icon to favorite a song
      </p>
      <div className="sort-dropdown">
        <label htmlFor="sort">Sort by: </label>
        <select
          id="sort"
          value={sortMethod}
          onChange={(e) => setSortMethod(e.target.value)}
        >
          <option value="time-asc">Time &#x25B2;</option>
          <option value="time-desc">Time &#x25BC;</option>
          <option value="alpha-asc">Name &#x25B2;</option>
          <option value="alpha-desc">Name &#x25BC;</option>
          <option value="artist-asc">Artist &#x25B2;</option>
          <option value="artist-desc">Artist &#x25BC;</option>
          <option value="dateAdded-asc">Date Added &#x25B2;</option>
          <option value="dateAdded-desc">Date Added &#x25BC;</option>
          <option value="fav-asc">Fav &#x25B2;</option>
          <option value="fav-desc">Fav &#x25BC;</option>
        </select>
      </div>
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
                <p
                  onClick={() => handleFavToggle(song.id, song.is_favorite)}
                  className="transitional"
                >
                  {song.is_favorite ? "★" : "☆"}
                </p>
                <Link to={`/songs/${song.id}`} className="transitional">
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
