import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <div className="nav-container">
      <img src="./tuner-logo.png" alt="Tuner logo" />
      <nav>
        <Link to={"/"}>Home</Link>
        <Link to={"/songs"}>Songs</Link>
        <Link to={"/songs/new"}>Add a Song</Link>
      </nav>
    </div>
  );
}
