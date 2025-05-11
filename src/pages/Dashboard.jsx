import React, { useState } from "react";
import Wallet from "../components/wallet"; // Import the Wallet component

function Dashboard() {
  const [userId] = useState("user123"); // This can come from auth/login
  const [balance, setBalance] = useState(1000);
  const [tier] = useState("Bronze");

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">Dashboard</h1>

      {/* Profile Section with Image */}
      <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg text-center">
        <img
          src="https://www.w3schools.com/w3images/avatar2.png"
          alt="User Profile"
          className="w-24 h-24 rounded-full mx-auto"
        />
        <h2 className="text-2xl text-gray-100">Welcome back!</h2>
        <p className="text-lg text-gray-400">User ID: {userId}</p>
        <p className="text-lg text-gray-400">Balance: ${balance}</p>
        <p className="text-lg text-gray-400">Tier: {tier}</p>
      </div>

      {/* Wallet Component */}
      <Wallet balance={balance} setBalance={setBalance} />
    </div>
  );
}

export default Dashboard;
