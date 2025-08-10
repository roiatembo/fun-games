// src/games/wordle/wordleUtils.js
import words from './wordlist.json'; // Import the word list

// Create a Set for fast validation lookup
const VALID = new Set(words);

export function pickRandomWord() {
  const idx = Math.floor(Math.random() * words.length);
  return words[idx];
}

/**
 * checkGuess(guess, answer)
 * returns array of statuses for each letter: 'correct', 'present', 'absent'
 * Implements standard Wordle matching with handling of repeated letters.
 */
export function checkGuess(guess, answer) {
  const result = Array(guess.length).fill("absent");
  const answerLetters = answer.split("");

  // First pass: correct letters
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === answer[i]) {
      result[i] = "correct";
      answerLetters[i] = null; // consume
    }
  }

  // Second pass: present letters
  for (let i = 0; i < guess.length; i++) {
    if (result[i] === "correct") continue;
    const idx = answerLetters.indexOf(guess[i]);
    if (idx !== -1) {
      result[i] = "present";
      answerLetters[idx] = null; // consume
    } else {
      result[i] = "absent";
    }
  }

  return result;
}

export const VALID_WORDS = VALID;
export const WORD_LIST = words;
