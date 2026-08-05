const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { AlertModel } = require("../model/AlertModel");
const { getStockQuote } = require("../services/stockServices");

// GET /api/alerts — list the user's alerts
router.get("/", authMiddleware, async (req, res) => {
  try {
    const alerts = await AlertModel.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, alerts });
  } catch (err) {
    res.status(500).json({ success: false, message: "Unable to fetch alerts" });
  }
});

// POST /api/alerts  { "symbol": "TCS.NS", "condition": "above", "targetPrice": 3500 }
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { symbol, condition, targetPrice } = req.body;

    if (!symbol || !["above", "below"].includes(condition) || !targetPrice) {
      return res.status(400).json({
        success: false,
        message: "symbol, condition ('above'|'below'), and targetPrice are required",
      });
    }

    const alert = await AlertModel.create({
      userId: req.user.id,
      symbol: symbol.toUpperCase(),
      condition,
      targetPrice,
    });

    res.status(201).json({ success: true, alert });
  } catch (err) {
    res.status(500).json({ success: false, message: "Unable to create alert" });
  }
});

// DELETE /api/alerts/:id
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await AlertModel.deleteOne({ _id: req.params.id, userId: req.user.id });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: "Unable to delete alert" });
  }
});

// GET /api/alerts/check — checks all un-triggered alerts against live prices,
// marks newly-triggered ones, and returns just the ones that fired.
// The frontend polls this on an interval to power in-app notifications.
router.get("/check", authMiddleware, async (req, res) => {
  try {
    const pending = await AlertModel.find({ userId: req.user.id, triggered: false });

    const justTriggered = [];

    for (const alert of pending) {
      const quote = await getStockQuote(alert.symbol);
      if (!quote.success) continue;

      const hit =
        (alert.condition === "above" && quote.price >= alert.targetPrice) ||
        (alert.condition === "below" && quote.price <= alert.targetPrice);

      if (hit) {
        alert.triggered = true;
        await alert.save();
        justTriggered.push({ ...alert.toObject(), currentPrice: quote.price });
      }
    }

    res.json({ success: true, triggered: justTriggered });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Unable to check alerts" });
  }
});

module.exports = router;
