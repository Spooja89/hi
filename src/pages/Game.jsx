import React, { useState } from "react";
import SlotMachine from "../games/SlotMachine";
import DiceRoll from "../games/DiceRoll";
import Roulette from "../games/Roulette";
import CoinFlip from "../games/CoinFlip";
import Blackjack from "../games/Blackjack";
import NumberGuess from "../games/NumberGuess";
import RockPaperScissors from "../games/RockPaperScissors";
import LuckyDraw from "../games/LuckyDraw";
import CardPick from "../games/CardPick";
import Bingo from "../games/Bingo";
import Minefield from "../games/Minefield";

function Game() {
  const [result, setResult] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [balance, setBalance] = useState(1000);
  const [depositAmount, setDepositAmount] = useState(0);
  const [tier, setTier] = useState("Bronze");

  const updateTier = (newBalance) => {
    if (newBalance >= 500) setTier("Gold");
    else if (newBalance >= 100) setTier("Silver");
    else setTier("Bronze");
  };

  const playGame = () => {
    if (balance < 50) {
      setResult("❌ Not enough balance to play!");
      return;
    }

    setSpinning(true);
    setResult("");

    setTimeout(() => {
      const win = Math.random() > 0.5;
      const updatedBalance = win ? balance + 100 : balance - 50;

      setBalance(updatedBalance);
      updateTier(updatedBalance);
      setResult(win ? "🎉 You Won!" : "😢 You Lost!");
      setSpinning(false);
    }, 3000);
  };

  const handleDeposit = () => {
    if (depositAmount <= 0) return;
    const newBalance = balance + depositAmount;
    setBalance(newBalance);
    updateTier(newBalance);
    setDepositAmount(0);
  };

  const gameComponents = [
    { title: "Slot Machine", component: <SlotMachine balance={balance} setBalance={setBalance} /> },
    { title: "Dice Roll", component: <DiceRoll balance={balance} setBalance={setBalance} /> },
    { title: "Roulette", component: <Roulette balance={balance} setBalance={setBalance} /> },
    { title: "Coin Flip", component: <CoinFlip balance={balance} setBalance={setBalance} /> },
    { title: "Blackjack", component: <Blackjack balance={balance} setBalance={setBalance} /> },
    { title: "Number Guess", component: <NumberGuess balance={balance} setBalance={setBalance} /> },
    { title: "Rock Paper Scissors", component: <RockPaperScissors balance={balance} setBalance={setBalance} /> },
    { title: "Lucky Draw", component: <LuckyDraw balance={balance} setBalance={setBalance} /> },
    { title: "Card Pick", component: <CardPick balance={balance} setBalance={setBalance} /> },
    { title: "Bingo", component: <Bingo balance={balance} setBalance={setBalance} /> },
    { title: "Minefield", component: <Minefield balance={balance} setBalance={setBalance} /> },
  ];

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">🎰 Crypto Casino Games</h1>

      {/* Balance and Deposit Section */}
      <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">
        <div className="flex-1 bg-gray-800 rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold">Balance: ${balance}</h2>
          <p className="text-lg text-gray-400 mt-1">Tier: {tier}</p>
        </div>

        <div className="flex-1 bg-gray-800 rounded-lg shadow-lg p-6 text-center">
          <h3 className="text-xl font-semibold">Deposit Crypto</h3>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(Number(e.target.value))}
            placeholder="Enter amount"
            className="mt-4 w-full px-4 py-2 bg-gray-700 text-white rounded"
          />
          <button
            onClick={handleDeposit}
            className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded"
          >
            Deposit
          </button>
        </div>
      </div>

      {/* Wheel Spin Section */}
      <div className="text-center mb-10">
        <div
          className={`wheel-container ${spinning ? "spin" : ""} mx-auto mb-6`}
          style={{
            maxWidth: "250px",
            minWidth: "200px",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="https://th.bing.com/th/id/OIP.UxCLg1hlFRzM1eTzG6jrOQHaHa?rs=1&pid=ImgDetMain"
            alt="Spin Wheel"
            className="rounded-full"
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "300px",
            }}
          />
        </div>

        <button
          onClick={playGame}
          disabled={spinning}
          className={`px-6 py-3 bg-blue-600 text-white rounded ${spinning ? "cursor-not-allowed opacity-50" : ""}`}
        >
          {spinning ? "Spinning..." : "Spin"}
        </button>

        <p className="mt-4 text-xl">{result}</p>
      </div>

      {/* Game Grid */}
<h2 className="text-3xl font-semibold mb-6 text-center">🎮 Playable Games</h2>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {gameComponents.map((game, idx) => (
    <div
      key={idx}
      className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center justify-start min-h-[350px] max-h-[400px] overflow-y-auto"
    >
      <h3 className="text-xl font-bold mb-4 text-center">{game.title}</h3>
      <div className="w-full flex-1 flex justify-center items-start">
        {game.component}
      </div>
    </div>
  ))}
</div>


      {/* Animation CSS */}
      <style jsx>{`
        .wheel-container {
          transition: transform 3s ease-out;
        }
        .wheel-container.spin {
          transform: rotate(1440deg);
        }
      `}</style>
    </div>
  );
}

export default Game;
