import React, { useState } from "react";

function LuckyDraw({ balance, setBalance }) {
  const [betAmount, setBetAmount] = useState("");
  const [result, setResult] = useState("");
  const [isDrawing, setIsDrawing] = useState(false);

  const handleDraw = () => {
    const bet = Number(betAmount);

    if (bet <= 0 || bet > balance) {
      setResult("❌ Invalid bet amount.");
      return;
    }

    setIsDrawing(true);

    // Simulate delay (for visual feedback)
    setTimeout(() => {
      const win = Math.random() < 0.1; // 10% chance
      const newBalance = win ? balance + bet * 10 : balance - bet;

      setBalance(newBalance);
      setResult(win ? `🎉 You win the Lucky Draw! You earn $${bet * 10}.` : `😢 You lost the Lucky Draw. You lose $${bet}.`);
      setIsDrawing(false);
    }, 1000);
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-3xl font-bold mb-4 text-center">Lucky Draw</h2>
        <p className="text-center mb-4">Current Balance: <strong>${balance}</strong></p>

        <input
          type="number"
          placeholder="Enter your bet amount"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white mb-4"
          required
        />
        <button
          onClick={handleDraw}
          disabled={isDrawing}
          className={`w-full p-2 rounded ${isDrawing ? "bg-gray-600" : "bg-green-600 hover:bg-green-700"} transition`}
        >
          {isDrawing ? "Drawing..." : "Draw"}
        </button>

        {result && <p className="mt-4 text-center text-lg">{result}</p>}
      </div>
    </div>
  );
}

export default LuckyDraw;
