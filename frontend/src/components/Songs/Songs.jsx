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
  const [sortMethod, setSortMethod] = useState({
    field: "dateAdded",
    direction: "asc",
  });

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
    songSort(sortedSongs, `${sortMethod.field}-${sortMethod.direction}`);
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

  const handleSortChange = (field) => {
    setSortMethod((prev) => {
      const newDirection =
        prev.field === field && prev.direction === "asc" ? "desc" : "asc";
      return { field, direction: newDirection };
    });
  };

  return (
    <div className="songs-container">
      <h1 className="songs-container_heading">Songs</h1>
      <p className="songs-container_heading">
        Click on star icon to favorite a song. Click on labels to sort content.
        Click on song name to get more information.
      </p>
      <h3
        onClick={() => handleSortChange("dateAdded")}
        className="songs-container_heading date-added"
      >
        Date Added{" "}
        {sortMethod.field === "dateAdded"
          ? sortMethod.direction === "asc"
            ? "▲"
            : "▼"
          : ""}
      </h3>
      <div className="songs-container_table">
        <div className="songs-container_labels">
          <h3 onClick={() => handleSortChange("fav")}>
            Fav{" "}
            {sortMethod.field === "fav"
              ? sortMethod.direction === "asc"
                ? "▲"
                : "▼"
              : ""}
          </h3>
          <h3 onClick={() => handleSortChange("alpha")}>
            Song{" "}
            {sortMethod.field === "alpha"
              ? sortMethod.direction === "asc"
                ? "▲"
                : "▼"
              : ""}
          </h3>
          <h3 onClick={() => handleSortChange("artist")}>
            Artist{" "}
            {sortMethod.field === "artist"
              ? sortMethod.direction === "asc"
                ? "▲"
                : "▼"
              : ""}
          </h3>
          <h3 onClick={() => handleSortChange("time")}>
            Time{" "}
            {sortMethod.field === "time"
              ? sortMethod.direction === "asc"
                ? "▲"
                : "▼"
              : ""}
          </h3>
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
