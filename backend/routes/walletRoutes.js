const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { UserModel } = require("../model/UserModel");

// GET /api/wallet — current virtual balance
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select("walletBalance");
    res.json({ success: true, balance: user?.walletBalance ?? 0 });
  } catch (err) {
    res.status(500).json({ success: false, message: "Unable to fetch wallet" });
  }
});

// POST /api/wallet/add  { "amount": 5000 }
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const amount = Number(req.body.amount);
    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: "Enter a valid amount" });
    }

    const user = await UserModel.findByIdAndUpdate(
      req.user.id,
      { $inc: { walletBalance: amount } },
      { new: true }
    ).select("walletBalance");

    res.json({ success: true, balance: user.walletBalance });
  } catch (err) {
    res.status(500).json({ success: false, message: "Unable to add funds" });
  }
});

// POST /api/wallet/withdraw  { "amount": 2000 }
router.post("/withdraw", authMiddleware, async (req, res) => {
  try {
    const amount = Number(req.body.amount);
    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: "Enter a valid amount" });
    }

    const user = await UserModel.findById(req.user.id).select("walletBalance");

    if (!user || user.walletBalance < amount) {
      return res.status(400).json({ success: false, message: "Insufficient balance to withdraw" });
    }

    user.walletBalance -= amount;
    await user.save();

    res.json({ success: true, balance: user.walletBalance });
  } catch (err) {
    res.status(500).json({ success: false, message: "Unable to withdraw funds" });
  }
});

module.exports = router;
