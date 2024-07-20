// Example utility for API calls
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchSongs = () => axios.get(`${API_URL}/songs`);
export const fetchSongById = (id) => axios.get(`${API_URL}/songs/${id}`);
export const createSong = (song) => axios.post(`${API_URL}/songs`, song);
export const updateSong = (id, song) => axios.put(`${API_URL}/songs/${id}`, song);
export const deleteSong = (id) => axios.delete(`${API_URL}/songs/${id}`);
