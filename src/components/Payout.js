// src/components/Payout.js

import React, { useState } from "react";
import axios from "axios";

const Payout = () => {
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePayout = async () => {
    try {
      const response = await axios.post("/api/users/payout", {
        userId: "user123", // Replace this with the actual userId
        amount,
      });
      setMessage(response.data.message);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Error processing payout");
      setMessage("");
    }
  };

  return (
    <div className="payout">
      <h2>Request Payout</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount to withdraw"
      />
      <button onClick={handlePayout}>Request Payout</button>
      
      {message && <p className="success">{message}</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
};

export default Payout;
