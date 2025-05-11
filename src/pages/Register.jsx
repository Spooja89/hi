import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [wallet, setWallet] = useState("");
  const [referrerCode, setReferrerCode] = useState(null); // from URL
  const [referralCode, setReferralCode] = useState(""); // for the user’s own code
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const refCode = queryParams.get("ref");
    if (refCode) {
      setReferrerCode(refCode);
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setErrorMessage("");

    // Prepare the payload for registration
    const payload = {
      username,
      password,
      wallet,
      referralCode,
    };

    if (referrerCode) {
      payload.referrerCode = referrerCode;
    }

    console.log("Sending payload:", payload);  // Check the payload being sent

    try {
      const response = await axios.post("http://localhost:5000/api/users/register", payload);

      // Log backend response for debugging
      console.log("Backend Response:", response.data);

      setMessage(`✅ ${response.data.message}`);
      setUsername("");
      setPassword("");
      setWallet("");
      setReferralCode("");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      const msg = err.response?.data?.error || "Registration Successful.";
      setErrorMessage(`✅ ${msg}`);
      console.error("Registration Error:", err.response?.data || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-3xl font-bold mb-4 text-center">Register</h2>

        {referrerCode && (
          <p className="mb-2 text-gray-400 text-sm text-center">
            You're joining via referral: <strong>{referrerCode}</strong>
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white mb-4"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white mb-4"
            required
          />
          <input
            type="text"
            placeholder="Wallet Address"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white mb-4"
            required
          />
          <input
            type="text"
            placeholder="Your Referral Code"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white mb-4"
            required
          />

          <button
            type="submit"
            className={`w-full p-2 rounded ${
              isLoading ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"
            } transition`}
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        {message && <p className="mt-4 text-center text-green-400">{message}</p>}
        {errorMessage && <p className="mt-4 text-center text-green-400">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Register;
