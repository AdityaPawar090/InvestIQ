const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { UserModel } = require("../model/UserModel");

// GET /api/favorites — list the logged-in user's favorite symbols
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select("favorites");
    res.json({ success: true, favorites: user?.favorites || [] });
  } catch (err) {
    res.status(500).json({ success: false, message: "Unable to fetch favorites" });
  }
});

// POST /api/favorites  { "symbol": "TCS" }
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { symbol } = req.body;
    if (!symbol) return res.status(400).json({ success: false, message: "symbol is required" });

    const user = await UserModel.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { favorites: symbol.toUpperCase() } },
      { new: true }
    ).select("favorites");

    res.json({ success: true, favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ success: false, message: "Unable to add favorite" });
  }
});

// DELETE /api/favorites/:symbol
router.delete("/:symbol", authMiddleware, async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(
      req.user.id,
      { $pull: { favorites: req.params.symbol.toUpperCase() } },
      { new: true }
    ).select("favorites");

    res.json({ success: true, favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ success: false, message: "Unable to remove favorite" });
  }
});

module.exports = router;
