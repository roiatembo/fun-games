// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import WordleClone from "./games/wordle/WordleClone";
import "./App.css";

function Home() {
  return (
    <div className="app">
      <h1>Game Hub</h1>

      <section className="game-section">
        <h2>Available Games</h2>
        <div className="game-buttons">
          <Link to="/wordle"><button className="game-btn">Wordle Clone <span className="tag">Solo</span></button></Link>
          <button className="game-btn">Imposter <span className="tag">Team</span></button>
        </div>
      </section>

      <section className="coming-soon">
        <h2>Coming Soon</h2>
        <p>More exciting games are on the way!</p>
      </section>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wordle" element={<WordleClone />} />
      </Routes>
    </Router>
  );
}

export default App;
