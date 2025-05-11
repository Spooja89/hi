// src/components/Wallet.js
import React, { useState } from "react";
import { ethers } from "ethers"; // Import Ethers.js for MetaMask integration

function Wallet({ balance, setBalance }) {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [error, setError] = useState("");

  // Connect to MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setWalletAddress(accounts[0]);
        setIsWalletConnected(true);
      } catch (err) {
        setError("Failed to connect to MetaMask. Please try again.");
        console.error(err);
      }
    } else {
      setError("MetaMask is not installed.");
    }
  };

  // Simulate depositing funds
  const handleDeposit = () => {
    if (depositAmount > 0) {
      setBalance(balance + parseFloat(depositAmount));
      setDepositAmount("");
      alert(`Deposited $${depositAmount} to your wallet!`);
    } else {
      alert("Please enter a valid deposit amount.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-6 bg-gray-800 rounded-lg shadow-lg text-center">
      <h2 className="text-2xl text-gray-100">Wallet</h2>
      {error && <p className="text-red-500">{error}</p>}

      {isWalletConnected ? (
        <>
          <p className="text-lg text-gray-400">Wallet Address: {walletAddress}</p>
          <p className="text-lg text-gray-400">Balance: ${balance}</p>
          <div className="mt-4">
            <input
              type="number"
              placeholder="Enter deposit amount"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              className="p-2 rounded bg-gray-700 text-white mb-4"
            />
            <button
              onClick={handleDeposit}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded transition duration-200 hover:bg-blue-700"
            >
              Deposit
            </button>
          </div>
        </>
      ) : (
        <button
          onClick={connectWallet}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded transition duration-200 hover:bg-green-700"
        >
          Connect MetaMask Wallet
        </button>
      )}
    </div>
  );
}

export default Wallet;