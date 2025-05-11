import React, { useState } from "react";

const cards = ["A♠", "K♦", "Q♣", "J♥", "10♠", "9♦", "8♣", "7♥", "6♠", "5♦", "4♣", "3♥", "2♠"];

export default function CardPick({ balance, setBalance }) {
  const [betAmount, setBetAmount] = useState(0);
  const [pickedCard, setPickedCard] = useState("");
  const [result, setResult] = useState(null);

  const handlePick = () => {
    if (betAmount <= 0 || betAmount > balance) {
      setResult("❌ Invalid bet amount.");
      return;
    }

    const index = Math.floor(Math.random() * cards.length);
    const card = cards[index];
    const cardNumber = index + 1;
    const win = cardNumber % 2 === 0; // Win if index+1 is even

    const newBalance = win ? balance + betAmount : balance - betAmount;
    setBalance(newBalance);

    setPickedCard(card);
    setResult(
      win
        ? `🎉 You picked ${card}. You win!`
        : `😢 You picked ${card}. You lose.`
    );
  };

  return (
    <div className="text-center">
      <p className="text-lg mb-2">Balance: ${balance}</p>

      <input
        type="number"
        value={betAmount}
        onChange={(e) => setBetAmount(Number(e.target.value))}
        placeholder="Enter your bet"
        className="mt-4 w-full px-4 py-2 bg-gray-700 text-white rounded"
      />

      <button
        onClick={handlePick}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
      >
        Pick a Card
      </button>

      <div className="mt-4 text-3xl">{pickedCard}</div>
      {result && <p className="mt-4 text-xl">{result}</p>}
    </div>
  );
}
