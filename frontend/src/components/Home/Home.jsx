import React from "react";
import "./Home.css";

export default function Home() {
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
        Welcome to the Tuner app. The tuner app allows you to store all your favorite songs in one spot. It allows you to edit and delete any song you put it in. Click on the Songs tab to view your songs.
      </p>
    </div>
  );
}
