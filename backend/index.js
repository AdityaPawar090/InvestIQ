require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { UserModel } = require("./model/UserModel");
const { getStockQuote } = require("./services/stockServices");
const stockRoutes = require("./routes/stockRoutes");
const aiRoutes = require("./routes/aiRoutes");
const favoritesRoutes = require("./routes/favoritesRoutes");
const alertRoutes = require("./routes/alertRoutes");
const walletRoutes = require("./routes/walletRoutes");

const authRoutes = require("./routes/authRoutes");
const verifyToken = require("./middleware/authMiddleware");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

// Comma-separated list in .env, e.g. http://localhost:3000,http://localhost:3001
const allowedOrigins = (process.env.CLIENT_ORIGINS || "http://localhost:3000,http://localhost:3001").split(",");

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // required so the browser sends/receives the httpOnly auth cookie
  })
);
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/favorites", favoritesRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/wallet", walletRoutes);

app.get("/", (req, res) => {
  res.send("🚀 InvestIQ Backend Running");
});

app.get("/allHoldings", verifyToken, async (req, res) => {
  try {
    const holdings = await HoldingsModel.find({
  userId: req.user.id,
});
    res.status(200).json(holdings);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Unable to fetch holdings",
    });
  }
});

app.get("/allPositions", verifyToken, async (req, res) => {
  try {
    const positions = await PositionsModel.find({
  userId: req.user.id,
});
    res.status(200).json(positions);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Unable to fetch positions",
    });
  }
});

app.get("/allOrders", verifyToken, async (req, res) => {
  try {
    const orders = await OrdersModel.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Unable to fetch orders",
    });
  }
});

app.post("/newOrder", verifyToken, async (req, res) => {
  try {
    const { name, qty, mode } = req.body;

    if (!name || !qty || qty <= 0 || !["BUY", "SELL"].includes(mode)) {
      return res.status(400).json({
        success: false,
        message: "name, a positive qty, and mode ('BUY'|'SELL') are required",
      });
    }

    // Always fetch the live price server-side rather than trusting whatever
    // price the client sends — prevents a tampered request from buying/selling
    // at an arbitrary price.
    const quote = await getStockQuote(`${name}.NS`);
    if (!quote.success) {
      return res.status(400).json({ success: false, message: "Unable to fetch a live price for this stock right now" });
    }
    const price = quote.price;

    const user = await UserModel.findById(req.user.id);
    const existing = await HoldingsModel.findOne({ userId: req.user.id, name });

    if (mode === "BUY") {
      const cost = price * qty;
      if (user.walletBalance < cost) {
        return res.status(400).json({
          success: false,
          message: `Insufficient balance. This order needs ₹${cost.toFixed(2)}, you have ₹${user.walletBalance.toFixed(2)}.`,
        });
      }

      user.walletBalance -= cost;
      await user.save();

      if (existing) {
        const totalQty = existing.qty + qty;
        const totalCost = existing.avg * existing.qty + price * qty;
        existing.qty = totalQty;
        existing.avg = totalCost / totalQty;
        existing.price = price;
        await existing.save();
      } else {
        await HoldingsModel.create({
          userId: req.user.id,
          name,
          qty,
          avg: price,
          price,
          net: "0.00%",
          day: "0.00%",
        });
      }
    } else {
      // SELL
      if (!existing || existing.qty < qty) {
        return res.status(400).json({
          success: false,
          message: `You only hold ${existing?.qty || 0} shares of ${name} — can't sell ${qty}.`,
        });
      }

      const proceeds = price * qty;
      user.walletBalance += proceeds;
      await user.save();

      const remaining = existing.qty - qty;
      if (remaining > 0) {
        existing.qty = remaining;
        existing.price = price;
        await existing.save();
      } else {
        await HoldingsModel.deleteOne({ _id: existing._id });
      }
    }

    const newOrder = new OrdersModel({
      userId: req.user.id,
      name,
      qty,
      price,
      mode,
    });
    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
      walletBalance: user.walletBalance,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Unable to place order",
    });
  }
});

mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
  });