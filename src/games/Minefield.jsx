import React, { useState, useEffect } from "react";

export default function Minefield({ balance, setBalance }) {
  const [betAmount, setBetAmount] = useState(0);
  const [mines, setMines] = useState(new Set());
  const [clicked, setClicked] = useState([]);
  const [result, setResult] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  // Initialize mine location when component mounts or game restarts
  useEffect(() => {
    setMines(new Set([Math.floor(Math.random() * 9)])); // One mine
  }, []);

  const handleClick = (index) => {
    if (clicked.includes(index) || gameOver) return;

    const newClicked = [...clicked, index];
    setClicked(newClicked);

    if (mines.has(index)) {
      setBalance(balance - betAmount);
      setResult("💥 You stepped on a mine! You lose.");
      setGameOver(true);
    } else {
      // 20% chance to win on safe click
      const win = Math.random() < 0.2;
      if (win) {
        setBalance(balance + betAmount * 10);
        setResult("🎉 You safely cleared a spot and won the Minefield!");
        setGameOver(true);
      } else {
        setResult("✅ Safe... but keep trying!");
      }
    }
  };

  const resetGame = () => {
    setClicked([]);
    setResult(null);
    setGameOver(false);
    setMines(new Set([Math.floor(Math.random() * 9)]));
  };

  return (
    <div className="text-center">
      <p className="text-lg mb-2">Balance: ${balance}</p>

      <input
        type="number"
        value={betAmount}
        onChange={(e) => setBetAmount(Number(e.target.value))}
        placeholder="Enter your bet amount"
        className="mt-2 w-full px-4 py-2 bg-gray-700 text-white rounded"
        disabled={gameOver}
      />

      <div className="grid grid-cols-3 gap-2 w-40 mx-auto mt-4">
        {[...Array(9)].map((_, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={`w-12 h-12 rounded ${
              clicked.includes(i)
                ? mines.has(i)
                  ? "bg-red-600"
                  : "bg-green-500"
                : "bg-gray-300"
            }`}
            disabled={gameOver}
          >
            {clicked.includes(i) && (mines.has(i) ? "💣" : "✅")}
          </button>
        ))}
      </div>

      {result && <p className="mt-4 text-xl">{result}</p>}

      {gameOver && (
        <button
          onClick={resetGame}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Play Again
        </button>
      )}
    </div>
  );
}
