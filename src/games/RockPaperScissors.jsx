import React, { useState } from "react";

const options = ["Rock", "Paper", "Scissors"];

export default function RockPaperScissors({ balance, setBalance }) {
  const [result, setResult] = useState("");
  const [betAmount, setBetAmount] = useState("");

  const play = (player) => {
    const cpu = options[Math.floor(Math.random() * 3)];
    const bet = Number(betAmount);

    if (bet <= 0 || bet > balance) {
      setResult("❌ Invalid bet amount.");
      return;
    }

    const win =
      (player === "Rock" && cpu === "Scissors") ||
      (player === "Paper" && cpu === "Rock") ||
      (player === "Scissors" && cpu === "Paper");

    const newBalance = win ? balance + bet : balance - bet;
    setBalance(newBalance);

    setResult(
      player === cpu
        ? `🤝 Tie! Both chose ${cpu}.`
        : win
        ? `🎉 You win! ${player} beats ${cpu}. You gain $${bet}.`
        : `💥 You lose! ${cpu} beats ${player}. You lose $${bet}.`
    );
  };

  return (
    <div className="text-center p-2 max-w-sm mx-auto bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-2">Rock Paper Scissors</h2>
      <p className="mb-2">Balance: ${balance}</p>

      <input
        type="number"
        min="1"
        placeholder="Enter your bet"
        value={betAmount}
        onChange={(e) => setBetAmount(e.target.value)}
        className="mb-2 p-2 w-full rounded text-black"
      />

      <div className="mb-4">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => play(opt)}
            className="mx-2 px-4 py-2 bg-blue-600 text-white rounded"
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="mt-4">{result}</div>
    </div>
  );
}
