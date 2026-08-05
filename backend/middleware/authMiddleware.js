const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Prefer httpOnly cookie (browser clients); fall back to Authorization
    // header (useful for testing with curl/Postman or non-browser clients).
    let token = req.cookies?.token;

    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader) {
        token = authHeader.split(" ")[1];
      }
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access Denied. No token provided.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

module.exports = authMiddleware;
