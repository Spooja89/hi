// src/components/UserProfile.js

import React, { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/me"); // Fetch current user details
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUser();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile">
      <h2>Welcome, {user.userId}</h2>
      <p>Current Tier: <strong>{user.tier}</strong></p>
      <p>Balance: ${user.balance}</p>
      <p>Total Earnings: ${user.totalEarnings}</p>

      <h3>Perks Unlocked:</h3>
      {user.tier === "Bronze" && <p>- Default (Free) Membership</p>}
      {user.tier === "Silver" && <p>- Access to Silver Perks</p>}
      {user.tier === "Gold" && <p>- Access to Gold Perks</p>}
    </div>
  );
};

export default UserProfile;
