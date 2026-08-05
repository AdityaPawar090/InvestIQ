const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { HoldingsModel } = require("../model/HoldingsModel");
const { getStockQuote } = require("../services/stockServices");
const { getPortfolioInsights, analyzeStock, chat } = require("../services/aiService");

// GET /api/ai/portfolio-insights — analyzes the logged-in user's real holdings
router.get("/portfolio-insights", authMiddleware, async (req, res) => {
  try {
    const holdings = await HoldingsModel.find({ userId: req.user.id });
    const insights = await getPortfolioInsights(holdings);
    res.status(200).json({ success: true, insights });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/ai/analyze-stock  { "stock": "TCS.NS" }
router.post("/analyze-stock", authMiddleware, async (req, res) => {
  try {
    const { stock } = req.body;
    if (!stock || !stock.trim()) {
      return res.status(400).json({ success: false, message: "Stock symbol/name is required" });
    }

    const quote = await getStockQuote(stock.trim());
    const analysis = await analyzeStock(stock.trim(), quote);

    res.status(200).json({ success: true, analysis });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/ai/chat  { "message": "..." }
router.post("/chat", authMiddleware, async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: "Message is required" });
    }

    const holdings = await HoldingsModel.find({ userId: req.user.id });
    const context = holdings.length
      ? holdings.map((h) => `${h.name} x${h.qty}`).join(", ")
      : null;

    const reply = await chat(message.trim(), context);

    res.status(200).json({ success: true, reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
