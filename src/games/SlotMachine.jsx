import React, { useState } from "react";

const icons = ["🍒", "🍋", "🔔", "⭐", "💎"];

function getRandom() {
  return icons[Math.floor(Math.random() * icons.length)];
}

export default function SlotMachine({ balance, setBalance }) {
  const [slots, setSlots] = useState(["🍒", "🍒", "🍒"]);
  const [message, setMessage] = useState("");

  const spin = () => {
    const newSlots = [getRandom(), getRandom(), getRandom()];
    setSlots(newSlots);

    const win = newSlots.every((s) => s === newSlots[0]);
    const newBalance = win ? balance + 100 : balance - 50;
    setBalance(newBalance); // Update balance after game result

    setMessage(win ? "🎉 Jackpot!" : "Try Again!");
  };

  return (
    <div className="text-center">
      <div className="text-4xl my-4">{slots.join(" ")}</div>
      <button
        onClick={spin}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Spin
      </button>
      <div className="mt-2">{message}</div>
    </div>
  );
}
