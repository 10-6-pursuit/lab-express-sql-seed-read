import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createSong, updateSong, getSong } from "../../utils/functions";
import "./SongForm.css";

export default function SongForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    name: "",
    artist: "",
    album: "",
    time: "",
    is_favorite: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getSong(id)
        .then((data) => {
          setForm(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const updatedForm = {
      ...form,
      album: form.album || "Unspecified",
      time: form.time || "Unspecified",
    };

    try {
      if (id) {
        await updateSong(id, updatedForm);
      } else {
        await createSong(updatedForm);
      }
      navigate("/songs");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="song-form-container">
      <h2>{id ? "Edit Song" : "Add New Song"}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Artist:
          <input
            type="text"
            name="artist"
            value={form.artist}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Album:
          <input
            type="text"
            name="album"
            value={form.album}
            onChange={handleChange}
          />
        </label>
        <label>
          Time:
          <input
            type="text"
            name="time"
            value={form.time}
            onChange={handleChange}
            placeholder="e.g. 3:45"
          />
        </label>
        <label>
          Favorite:
          <input
            type="checkbox"
            name="is_favorite"
            checked={form.is_favorite}
            onChange={handleChange}
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : id ? "Update Song" : "Add Song"}
        </button>
      </form>
    </div>
  );
}
