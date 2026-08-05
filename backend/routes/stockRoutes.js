const express = require("express");
const router = express.Router();

const { getStockQuote, getStockQuotesBatch, getFinancialNews } = require("../services/stockServices");

// GET /api/stocks/news?query=optional
// NOTE: defined before /:symbol so "news" isn't swallowed as a stock symbol
router.get("/news", async (req, res) => {
  try {
    const result = await getFinancialNews(req.query.query);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// GET /api/stocks/batch?symbols=TCS.NS,INFY.NS,WIPRO.NS
router.get("/batch", async (req, res) => {
  try {
    const symbols = (req.query.symbols || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (symbols.length === 0) {
      return res.status(400).json({ success: false, message: "symbols query param is required" });
    }

    const quotes = await getStockQuotesBatch(symbols);
    res.json({ success: true, quotes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// GET /api/stocks/TCS.NS
router.get("/:symbol", async (req, res) => {
  try {
    const data = await getStockQuote(req.params.symbol);

    if (!data.success) {
      return res.status(404).json(data);
    }

    res.json(data);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;
