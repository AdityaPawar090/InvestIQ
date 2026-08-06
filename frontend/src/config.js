// Backend API URL — set REACT_APP_API_URL in your hosting provider's env vars.
export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3002";

// The trading dashboard app's URL — set REACT_APP_DASHBOARD_URL in your
// hosting provider's env vars for production (e.g. https://your-dashboard.vercel.app).
export const DASHBOARD_URL = process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3001";