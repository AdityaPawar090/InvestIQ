const express = require("express");

const router = express.Router();

const { signup, login, me, logout, deleteAccount } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const authLimiter = require("../middleware/rateLimiter");

router.post("/signup", authLimiter, signup);
router.post("/login", authLimiter, login);
router.post("/logout", logout);
router.get("/me", authMiddleware, me);
router.delete("/account", authMiddleware, deleteAccount);

module.exports = router;
