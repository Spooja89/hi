import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Game from "./pages/Game";
import Referral from "./components/Referral";
import Register from "./pages/Register";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="bg-gray-900 min-h-screen text-white">
          <header className="p-4 bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400">
            <nav className="flex justify-between items-center">
              <Link to="/" className="text-3xl font-bold text-white hover:underline">
                Crypto Casino
              </Link>
              <div className="space-x-4">
                <Link to="/dashboard" className="text-lg hover:underline">
                  Dashboard
                </Link>
                <Link to="/game" className="text-lg hover:underline">
                  Play Game
                </Link>
                <Link to="/referral" className="text-lg hover:underline">
                  Referral
                </Link>
                <Link to="/register" className="text-lg hover:underline">
                  Register
                </Link>
              </div>
            </nav>
          </header>

          <main className="p-8">
            <Routes>
              <Route path="/" element={<Register />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/game" element={<Game />} />
              <Route path="/referral" element={<Referral />} />
            </Routes>
          </main>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
