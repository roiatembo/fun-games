// src/games/wordle/WordleKeyboard.js
import React from "react";

const ROWS = [
  "QWERTYUIOP".split(""),
  "ASDFGHJKL".split(""),
  ["ENTER", ..."ZXCVBNM".split(""), "BACK"],
];

function keyStatus(letter, evaluations) {
  // Find highest-priority status for letter across all evaluated rows:
  // priority: correct > present > absent > null
  if (!evaluations) return null;
  let result = null;
  for (let row of evaluations) {
    if (!row) continue;
    for (let cell of row) {
      if (cell.letter === letter) {
        if (cell.status === "correct") return "correct";
        if (cell.status === "present") result = result === "correct" ? "correct" : "present";
        if (cell.status === "absent" && result == null) result = "absent";
      }
    }
  }
  return result;
}

export default function WordleKeyboard({ onKeyPress, evaluations }) {
  return (
    <div className="keyboard">
      {ROWS.map((row, rIdx) => (
        <div className="key-row" key={rIdx}>
          {row.map((k) => {
            const status = keyStatus(k, evaluations);
            const cls = "key" + (status ? ` ${status}` : "");
            return (
              <button
                key={k}
                className={cls}
                onClick={() => onKeyPress(k === "BACK" ? "BACK" : k === "ENTER" ? "ENTER" : k)}
              >
                {k === "BACK" ? "⌫" : k}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

