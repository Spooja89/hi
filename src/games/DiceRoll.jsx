import React, { useState } from "react";

function DiceRoll({ balance, setBalance }) {
  const [result, setResult] = useState(1);

  const roll = () => {
    const betAmount = 50; // Set a fixed bet amount for this example. You can update it based on your game logic
    if (betAmount <= 0 || betAmount > balance) {
      setResult("❌ Invalid bet amount.");
      return;
    }

    const roll = Math.floor(Math.random() * 6) + 1; // Roll a die (1-6)
    const win = roll > 3; // Win if roll is greater than 3

    const newBalance = win ? balance + betAmount : balance - betAmount;
    setBalance(newBalance);
    setResult(win ? `🎉 You rolled a ${roll}. You win!` : `😢 You rolled a ${roll}. You lose.`);
  };

  return (
    <div className="text-center">
      {/* Reduced the text size here */}
      <div className="text-3xl my-4">🎲 {result}</div>
      <button
        onClick={roll}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Roll the Dice
      </button>
    </div>
  );
}

export default DiceRoll;
