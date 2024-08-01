import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Nav from "./components/Nav";
import NotFound from "./components/NotFound";
import Song from "./components/Song";
import SongForm from "./components/SongForm";
import Songs from "./components/Songs.jsx";

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
