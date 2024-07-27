import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Container } from "react-bootstrap";

const SongDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [song, setSong] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/songs/${id}`)
      .then((response) => setSong(response.data))
      .catch((error) => console.error("Error fetching song details:", error));
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this song?")) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/songs/${id}`)
        .then(() => navigate("/songs"))
        .catch((error) => console.error("Error deleting song:", error));
    }
  };

  return (
    <Container>
      {song && (
        <div>
          <h1>{song.title}</h1>
          <p>Artist: {song.artist}</p>
          <p>Album: {song.album}</p>
          <p>Time: {song.time}</p>
          <p>Favorite: {song.is_favorite ? "Yes" : "No"}</p>
          <Button onClick={() => navigate("/songs")}>Back</Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
          <Link to={`/songs/${id}/edit`}>
            <Button>Edit</Button>
          </Link>
        </div>
      )}
    </Container>
  );
};

export default SongDetails;
