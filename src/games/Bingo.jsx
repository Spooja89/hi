import React, { useState } from "react";

export default function Bingo({ balance, setBalance }) {
  const [betAmount, setBetAmount] = useState(0);
  const [number, setNumber] = useState(null);
  const [result, setResult] = useState(null);

  const handlePlay = () => {
    if (betAmount <= 0 || betAmount > balance) {
      setResult("❌ Invalid bet amount.");
      return;
    }

    const drawnNumber = Math.floor(Math.random() * 75) + 1;
    setNumber(drawnNumber);

    const win = Math.random() < 0.1; // 10% chance to win
    const newBalance = win ? balance + betAmount * 5 : balance - betAmount;
    setBalance(newBalance);

    setResult(win ? `🎉 You won Bingo!` : `😢 You lost Bingo.`);
  };

  return (
    <div className="text-center">
      <p className="text-lg mb-2">Balance: ${balance}</p>

      <input
        type="number"
        value={betAmount}
        onChange={(e) => setBetAmount(Number(e.target.value))}
        placeholder="Enter your bet amount"
        className="mt-4 w-full px-4 py-2 bg-gray-700 text-white rounded"
      />

      <button
        onClick={handlePlay}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
      >
        Play Bingo
      </button>

      {number && <div className="mt-4 text-4xl">B-{number}</div>}
      {result && <p className="mt-4 text-xl">{result}</p>}
    </div>
  );
}
