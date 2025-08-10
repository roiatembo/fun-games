// src/games/wordle/WordleBoard.js
import React from "react";

function Tile({ letter, status }) {
  const className = "tile " + (status ? ` ${status}` : "");
  return <div className={className}>{letter}</div>;
}

export default function WordleBoard({ board, evaluations, currentRow }) {
  return (
    <div className="board">
      {board.map((row, rIdx) => {
        const evalRow = evaluations[rIdx];
        return (
          <div className="board-row" key={rIdx}>
            {row.map((letter, cIdx) => {
              const status = evalRow ? evalRow[cIdx].status : null;
              return <Tile key={cIdx} letter={letter} status={status} />;
            })}
          </div>
        );
      })}
    </div>
  );
}

