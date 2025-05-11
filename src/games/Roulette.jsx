import React, { useState } from "react";

function Roulette({ balance, setBalance }) {
  const [betAmount, setBetAmount] = useState(0);
  const [betType, setBetType] = useState("red"); // Can be "red", "black", or "green"
  const [result, setResult] = useState(null);

  const handleSpin = () => {
    if (betAmount <= 0 || betAmount > balance) {
      setResult("❌ Invalid bet amount.");
      return;
    }

    const winningColor = ["red", "black", "green"][Math.floor(Math.random() * 3)]; // Simulating a roulette spin
    const win = winningColor === betType;

    const newBalance = win ? balance + betAmount : balance - betAmount;
    setBalance(newBalance);
    setResult(
      win
        ? `🎉 The ball landed on ${winningColor}. You win!`
        : `😢 The ball landed on ${winningColor}. You lose.`
    );
  };

  return (
    <div className="text-center">
      <input
        type="number"
        value={betAmount}
        onChange={(e) => setBetAmount(Number(e.target.value))}
        placeholder="Bet Amount"
        className="mt-4 w-full px-4 py-2 bg-gray-700 text-white rounded"
      />
      <select
        value={betType}
        onChange={(e) => setBetType(e.target.value)}
        className="mt-4 w-full px-4 py-2 bg-gray-700 text-white rounded"
      >
        <option value="red">Red</option>
        <option value="black">Black</option>
        <option value="green">Green</option>
      </select>
      <button
        onClick={handleSpin}
        className="mt-4 w-full px-4 py-2 bg-purple-600 text-white rounded"
      >
        Spin the Wheel
      </button>
      {result && <div className="mt-4 text-xl">{result}</div>}
    </div>
  );
}

export default Roulette;
