import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const NewSong = () => {
  const [form, setForm] = useState({
    name: "",
    artist: "",
    album: "",
    is_favorite: false,
    time: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/songs`, form)
      .then(() => navigate("/songs"))
      .catch((error) => console.error("Error adding new song:", error));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formArtist">
        <Form.Label>Artist</Form.Label>
        <Form.Control
          type="text"
          name="artist"
          value={form.artist}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formAlbum">
        <Form.Label>Album</Form.Label>
        <Form.Control
          type="text"
          name="album"
          value={form.album}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formIsFavorite">
        <Form.Check
          type="checkbox"
          name="is_favorite"
          checked={form.is_favorite}
          onChange={handleChange}
          label="Favorite"
        />
      </Form.Group>
      <Form.Group controlId="formTime">
        <Form.Label>Time</Form.Label>
        <Form.Control
          type="text"
          name="time"
          value={form.time}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default NewSong;
