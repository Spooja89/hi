import React, { useState } from "react";

export default function NumberGuess({ balance, setBalance }) {
  const [guess, setGuess] = useState("");
  const [betAmount, setBetAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleGuess = () => {
    const num = Math.floor(Math.random() * 10) + 1;
    const guessed = Number(guess);
    const bet = Number(betAmount);

    if (bet <= 0 || bet > balance) {
      setMessage("❌ Invalid bet amount.");
      return;
    }

    if (guessed < 1 || guessed > 10) {
      setMessage("❌ Guess must be between 1 and 10.");
      return;
    }

    const win = guessed === num;
    const newBalance = win ? balance + bet : balance - bet;
    setBalance(newBalance);

    setMessage(
      win
        ? `🎉 You guessed ${guessed}. Correct! You win $${bet}!`
        : `😢 You guessed ${guessed}. The correct number was ${num}. You lose $${bet}.`
    );
  };

  return (
    <div className="text-center p-4 max-w-sm mx-auto bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Number Guess Game</h2>
      <p className="mb-2">Balance: ${balance}</p>

      <input
        className="border p-2 rounded w-full mb-2 text-black"
        type="number"
        min="1"
        max="10"
        placeholder="Enter your guess (1-10)"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
      />

      <input
        className="border p-2 rounded w-full mb-2 text-black"
        type="number"
        min="1"
        placeholder="Enter your bet"
        value={betAmount}
        onChange={(e) => setBetAmount(e.target.value)}
      />

      <button
        onClick={handleGuess}
        className="px-4 py-2 bg-green-600 text-white rounded w-full"
      >
        Guess
      </button>

      <div className="mt-4">{message}</div>
    </div>
  );
}
