// frontend/src/games/wordle/WordleClone.js
import React, { useState, useEffect } from "react";
import WordleBoard from "./WordleBoard";
import WordleKeyboard from "./WordleKeyboard";
import { pickRandomWord, checkGuess, VALID_WORDS } from "./wordleUtils";
import "./wordle.css";
import { Link } from "react-router-dom";

const MAX_ROWS = 6;
const WORD_LENGTH = 5;

function WordleClone() {
  const [answer, setAnswer] = useState("");
  const [board, setBoard] = useState(Array.from({ length: MAX_ROWS }, () => Array(WORD_LENGTH).fill("")));
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const [evaluations, setEvaluations] = useState(Array(MAX_ROWS).fill(null)); // each row -> array of {letter, status}
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    startNewGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function startNewGame() {
    const w = pickRandomWord();
    setAnswer(w);
    setBoard(Array.from({ length: MAX_ROWS }, () => Array(WORD_LENGTH).fill("")));
    setCurrentRow(0);
    setCurrentCol(0);
    setEvaluations(Array(MAX_ROWS).fill(null));
    setMessage("");
    setGameOver(false);
    // console.log("answer:", w); // uncomment for debugging
  }

  // central key handler used by both on-screen keys and physical keyboard
  function onKeyPress(key) {
    if (gameOver) return;

    if (key === "ENTER") {
      handleEnter();
      return;
    }
    if (key === "BACK") {
      handleBackspace();
      return;
    }
    // letter
    if (currentCol < WORD_LENGTH && /^[A-Z]$/.test(key)) {
      const newBoard = board.map((r) => r.slice());
      newBoard[currentRow][currentCol] = key;
      setBoard(newBoard);
      setCurrentCol((c) => c + 1);
    }
  }

  function handleBackspace() {
    if (currentCol === 0) return;
    const newBoard = board.map((r) => r.slice());
    newBoard[currentRow][currentCol - 1] = "";
    setBoard(newBoard);
    setCurrentCol((c) => c - 1);
  }

  function handleEnter() {
    if (currentCol !== WORD_LENGTH) {
      setMessage("Not enough letters");
      setTimeout(() => setMessage(""), 1200);
      return;
    }
    const guess = board[currentRow].join("").toLowerCase();
    if (!VALID_WORDS.has(guess)) {
      setMessage("Not in word list");
      setTimeout(() => setMessage(""), 1200);
      return;
    }

    const evalRow = checkGuess(guess, answer); // returns array of statuses: 'correct','present','absent'
    const newEvals = evaluations.slice();
    newEvals[currentRow] = evalRow.map((s, idx) => ({ letter: board[currentRow][idx], status: s }));
    setEvaluations(newEvals);

    if (evalRow.every((s) => s === "correct")) {
      setMessage("You win!");
      setGameOver(true);
      return;
    }

    if (currentRow + 1 >= MAX_ROWS) {
      setMessage(`Game over! Answer: ${answer.toUpperCase()}`);
      setGameOver(true);
      return;
    }

    // move to next row
    setCurrentRow((r) => r + 1);
    setCurrentCol(0);
  }

  // --- PHYSICAL KEYBOARD SUPPORT ---
  // Listens for keydown events and forwards them to onKeyPress
  useEffect(() => {
    const handlePhysicalKey = (e) => {
      if (gameOver) return;

      const k = e.key;
      if (k === "Enter") {
        e.preventDefault();
        onKeyPress("ENTER");
        return;
      }
      if (k === "Backspace") {
        e.preventDefault();
        onKeyPress("BACK");
        return;
      }
      // only accept a-z letters
      const letter = k.toUpperCase();
      if (/^[A-Z]$/.test(letter) && letter.length === 1) {
        onKeyPress(letter);
      }
    };

    window.addEventListener("keydown", handlePhysicalKey);
    return () => window.removeEventListener("keydown", handlePhysicalKey);
  }, [gameOver, currentCol, currentRow, board, evaluations, answer]); // re-register when these change

  return (
    <div className="wordle-page">
      <header className="wordle-header">
        <Link to="/" className="back-link">← Home</Link>
        <h1>Wordle Clone</h1>
        <button className="new-btn" onClick={startNewGame}>New Game</button>
      </header>

      <main>
        <WordleBoard board={board} evaluations={evaluations} currentRow={currentRow} />
        <div className="message">{message}</div>
        <WordleKeyboard onKeyPress={onKeyPress} evaluations={evaluations} />
      </main>
    </div>
  );
}

export default WordleClone;
