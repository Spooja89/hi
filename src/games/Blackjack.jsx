import React, { useState } from "react";

function Blackjack({ balance, setBalance }) {
  const [betAmount, setBetAmount] = useState(0);
  const [player, setPlayer] = useState([]);
  const [dealer, setDealer] = useState([]);
  const [result, setResult] = useState(null);

  const getCard = () => Math.floor(Math.random() * 11) + 1; // Get a random card between 1 and 11

  const deal = () => {
    const newPlayer = [getCard(), getCard()]; // Deal two cards to the player
    const newDealer = [getCard(), getCard()]; // Deal two cards to the dealer
    setPlayer(newPlayer);
    setDealer(newDealer);
  };

  const total = (cards) => cards.reduce((a, b) => a + b, 0); // Calculate total of cards

  const handlePlay = () => {
    if (betAmount <= 0 || betAmount > balance) {
      setResult("❌ Invalid bet amount.");
      return;
    }

    const playerScore = total(player); // Calculate player's score
    const dealerScore = total(dealer); // Calculate dealer's score

    const win = playerScore > dealerScore && playerScore <= 21; // Win if player score > dealer score and <= 21

    const newBalance = win ? balance + betAmount : balance - betAmount;
    setBalance(newBalance);
    setResult(
      win
        ? `🎉 You got ${playerScore}. Dealer got ${dealerScore}. You win!`
        : `😢 You got ${playerScore}. Dealer got ${dealerScore}. You lose.`
    );
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

      {/* Deal Button */}
      <button
        onClick={deal}
        className="mt-4 w-full px-4 py-2 bg-black text-white rounded"
      >
        Deal
      </button>

      {/* Player and Dealer Scores */}
      <div className="mt-4">
        <div>👤 You: {player.join(", ")} = {total(player)}</div>
        <div>🤖 Dealer: {dealer.join(", ")} = {total(dealer)}</div>
      </div>

      {/* Play Button */}
      <button
        onClick={handlePlay}
        className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded"
      >
        Play
      </button>

      {/* Result Display */}
      {result && <p className="mt-4 text-xl">{result}</p>}
    </div>
  );
}

export default Blackjack;
