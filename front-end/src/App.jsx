import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home';
import NavBar from './Components/NavBar';
import Favs from './Pages/Favs';

function App() {
  return (
    <>
      <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/favsongs" element={<Favs />}/>
          </Routes>
      </Router>
    </>
  );
}

export default App
