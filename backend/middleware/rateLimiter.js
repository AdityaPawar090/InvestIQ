const rateLimit = require("express-rate-limit");

// Applied to login/signup to slow down brute-force / credential-stuffing attempts.
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: {
    success: false,
    message: "Too many attempts. Please try again in 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = authLimiter;
