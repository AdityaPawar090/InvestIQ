const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { UserModel } = require("../model/UserModel");

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

const signToken = (user) =>
  jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

// ====================
// Signup
// ====================
const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      fullName,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "Account created successfully",
    });
  } catch (err) {
    console.error("Signup Error:", err);

    res.status(500).json({
      success: false,
      message: "Signup failed",
    });
  }
};

// ====================
// Login
// ====================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const user = await UserModel.findOne({ email });

    // Deliberately generic message on both "no user" and "bad password" so
    // we don't leak which emails are registered.
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = signToken(user);

    res.cookie("token", token, COOKIE_OPTIONS);

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);

    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

// ====================
// Current user (used by frontend to check auth state on load)
// ====================
const me = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Unable to fetch user" });
  }
};

// ====================
// Logout
// ====================
const logout = (req, res) => {
  res.clearCookie("token", COOKIE_OPTIONS);
  res.status(200).json({ success: true, message: "Logged out" });
};

// ====================
// Delete account (cascades to the user's holdings/orders/alerts)
// ====================
const deleteAccount = async (req, res) => {
  try {
    const { HoldingsModel } = require("../model/HoldingsModel");
    const { OrdersModel } = require("../model/OrdersModel");
    const { AlertModel } = require("../model/AlertModel");

    const userId = req.user.id;

    await Promise.all([
      HoldingsModel.deleteMany({ userId }),
      OrdersModel.deleteMany({ userId }),
      AlertModel.deleteMany({ userId }),
      UserModel.findByIdAndDelete(userId),
    ]);

    res.clearCookie("token", COOKIE_OPTIONS);
    res.status(200).json({ success: true, message: "Account deleted" });
  } catch (err) {
    console.error("Delete account error:", err);
    res.status(500).json({ success: false, message: "Unable to delete account" });
  }
};

module.exports = {
  signup,
  login,
  me,
  logout,
  deleteAccount,
};
