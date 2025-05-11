const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => {
  console.error("❌ MongoDB error:", err.message);
  process.exit(1);
});

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api", require("./routes/tree"));  // Now matches /api/tree/:userId
app.use("/api/referral", require("./routes/referral"));  // referral creation, tree, payout
app.use("/api/deposit", require("./routes/deposit"));
app.use("/api/mlm", require("./routes/mlm"));



// Health check
app.get("/", (req, res) => res.send("🎰 Crypto Casino API is live"));

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
