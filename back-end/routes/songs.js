const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/songs', async (req, res) => {
  try {
    const songs = await db.any('SELECT * FROM songs');
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/songs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const song = await db.one('SELECT * FROM songs WHERE id = $1', [id]);
    res.json(song);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/songs', async (req, res) => {
  // const { title, artist, album, genre, release_date } = req.body;
  // if (!title || !artist || !album || !genre || !release_date) {
  //   return res.status(400).json({ error: 'All fields are required' });
  // }
  try {
    const newSong = await db.one(
      'INSERT INTO songs (title, artist, album, genre, release_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, artist, album, genre, release_date]
    );
    res.status(201).json(newSong);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/songs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.none('DELETE FROM songs WHERE id = $1', [id]);
    res.status(204).json({ message: 'Song deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/songs/:id', async (req, res) => {
  const { id } = req.params;
  const { title, artist, album, genre, release_date } = req.body;
  if (!title || !artist || !album || !genre || !release_date) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const updatedSong = await db.one(
      'UPDATE songs SET title = $1, artist = $2, album = $3, genre = $4, release_date = $5 WHERE id = $6 RETURNING *',
      [title, artist, album, genre, release_date, id]
    );
    res.json(updatedSong);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
