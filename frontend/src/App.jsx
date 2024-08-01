import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home.jsx";
import Nav from "./components/Nav/Nav.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import Song from "./components/Song/Song.jsx";
import SongForm from "./components/SongForm/SongForm.jsx";
import Songs from "./components/Songs/Songs.jsx";

import "./App.css";

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/songs" element={<Songs />} />
        <Route path="/songs/:id" element={<Song />} />
        <Route path="/songs/new" element={<SongForm />} />
        <Route path="/songs/:id/edit" element={<SongForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
