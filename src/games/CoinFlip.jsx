import React, { useState } from "react";

function CoinFlip({ balance, setBalance }) {
  const [betAmount, setBetAmount] = useState(0);
  const [side, setSide] = useState("heads"); // Can be "heads" or "tails"
  const [result, setResult] = useState(null);

  const handleFlip = () => {
    if (betAmount <= 0 || betAmount > balance) {
      setResult("❌ Invalid bet amount.");
      return;
    }

    const coinSide = Math.random() > 0.5 ? "heads" : "tails"; // Flip coin (50% chance)
    const win = coinSide === side;

    const newBalance = win ? balance + betAmount : balance - betAmount;
    setBalance(newBalance);
    setResult(win ? `🎉 It's ${coinSide}. You win!` : `😢 It's ${coinSide}. You lose.`);
  };

  return (
    <div className="text-center">
      {/* Bet Amount Input */}
      <input
        type="number"
        value={betAmount}
        onChange={(e) => setBetAmount(Number(e.target.value))}
        placeholder="Bet Amount"
        className="mt-4 w-full px-4 py-2 bg-gray-700 text-white rounded"
      />

      {/* Side Selection (Heads or Tails) */}
      <select
        value={side}
        onChange={(e) => setSide(e.target.value)}
        className="mt-4 w-full px-4 py-2 bg-gray-700 text-white rounded"
      >
        <option value="heads">Heads</option>
        <option value="tails">Tails</option>
      </select>

      {/* Flip Coin Button */}
      <button
        onClick={handleFlip}
        className="mt-4 w-full px-4 py-2 bg-yellow-600 text-white rounded"
      >
        Flip Coin
      </button>

      {/* Result Display */}
      {result && <p className="mt-4 text-xl">{result}</p>}
    </div>
  );
}

export default CoinFlip;
