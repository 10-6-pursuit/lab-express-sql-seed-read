import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import NavBar from "./components/NavBar";
import SongsList from "./components/SongsList";
import SongDetails from "./components/SongDetails";
import NewSong from "./components/NewSong";
import EditSong from "./components/EditSong";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/songs" element={<SongsList />} />
        <Route path="/songs/new" element={<NewSong />} />
        <Route path="/songs/:id" element={<SongDetails />} />
        <Route path="/songs/:id/edit" element={<EditSong />} />
      </Routes>
    </>
  );
}

export default App;
