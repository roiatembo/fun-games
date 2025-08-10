import React, { useState } from "react";
import "./App.css";

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="app">
      <h1>Game Hub</h1>

      {/* Available Games */}
      <section className="game-section">
        <h2>Available Games</h2>
        <div className="game-buttons">
          <button className="game-btn">
            Wordle Clone <span className="tag">Solo</span>
          </button>
          <button className="game-btn">
            Imposter <span className="tag">Team</span>
          </button>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="coming-soon">
        <h2>Coming Soon</h2>
        <p>More exciting games are on the way!</p>
      </section>

      {/* Suggest Game Button */}
      <div className="suggest-container">
        <button className="suggest-btn" onClick={() => setShowModal(true)}>
          Suggest a Game
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <h3>Suggest a Game</h3>
            <input
              type="text"
              placeholder="Enter game name"
              className="input-field"
            />
            <textarea
              placeholder="Describe the game idea"
              className="input-field"
            ></textarea>
            <div className="modal-actions">
              <button
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className="submit-btn">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
