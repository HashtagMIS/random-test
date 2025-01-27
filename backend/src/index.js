const express = require("express");
const cors = require("express");
const app = express();

// CORS configuration
const corsOptions = {
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"], // Vite's default development port
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow credentials
  maxAge: 86400, // 24 hours in seconds
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Simulate a delay function
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Test endpoint with configurable delay
app.get("/api/test/:seconds", async (req, res) => {
  const seconds = parseInt(req.params.seconds) || 5;
  console.log(`Starting request with ${seconds} second delay...`);

  try {
    await delay(seconds * 1000);
    res.json({
      message: `Request completed after ${seconds} seconds`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Default route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Only listen to port if running locally
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
