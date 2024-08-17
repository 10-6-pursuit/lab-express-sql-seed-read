import React, { useEffect, useState } from "react";
import "./Home.css";
import { getPlaylists } from "../../utils/playlistFetch";

export default function Home() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    async function fetchPlaylists() {
      try {
        const data = await getPlaylists();
        setPlaylists(data);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    }

    fetchPlaylists();
  }, []);

  return (
    <div className="home-container">
      <h1>Welcome to the Tuner app</h1>
      <div className="home-container_image">
        <img
          src="https://media4.giphy.com/media/4T7zBzdeNEtjThYDWn/giphy.gif?cid=790b76114ee03ef7f860492a9083d77f86191a7bf340002c&rid=giphy.gif&ct=g"
          alt="Tuner Gif"
        />
      </div>
      <p>
        Welcome to the Tuner app. The tuner app allows you to store all your
        favorite songs in one spot. It allows you to edit and delete any song
        you put in. Click on the Songs tab to view your songs.
      </p>
      <div className="playlists-container">
        <h2>Your Playlists</h2>
        {playlists.length > 0 ? (
          <ul>
            {playlists.map((playlist) => (
              <li key={playlist.id}>
                <h3>{playlist.name}</h3>
                <p>{playlist.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No playlists found. Start creating some!</p>
        )}
      </div>
    </div>
  );
}
