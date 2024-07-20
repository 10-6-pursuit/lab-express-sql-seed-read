import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, ListGroup } from "react-bootstrap";

const SongsList = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/songs`)
      .then((response) => setSongs(response.data))
      .catch((error) => console.error("Error fetching songs:", error));
  }, []);

  const handleToggleFavorite = (id, isFavorite) => {
    axios
      .patch(`${process.env.REACT_APP_API_URL}/songs/${id}`, {
        is_favorite: !isFavorite,
      })
      .then(() =>
        setSongs(
          songs.map((song) =>
            song.id === id ? { ...song, is_favorite: !isFavorite } : song
          )
        )
      )
      .catch((error) =>
        console.error("Error updating favorite status:", error)
      );
  };

  return (
    <div>
      <h1>Songs List</h1>
      <ListGroup>
        {songs.map((song) => (
          <ListGroup.Item key={song.id}>
            <h5>{song.title}</h5>
            <p>Artist: {song.artist}</p>
            <p>Time: {song.time}</p>
            <Button
              variant={song.is_favorite ? "warning" : "secondary"}
              onClick={() => handleToggleFavorite(song.id, song.is_favorite)}
            >
              {song.is_favorite ? "★" : "☆"}
            </Button>
            <Link to={`/songs/${song.id}`}>Details</Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default SongsList;
