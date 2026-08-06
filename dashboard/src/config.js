// Backend API URL — set REACT_APP_API_URL in your hosting provider's env vars.
export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3002";

// The landing/auth app's URL (frontend) — set REACT_APP_LANDING_URL in your
// hosting provider's env vars for production (e.g. https://your-frontend.vercel.app).
export const LANDING_URL = process.env.REACT_APP_LANDING_URL || "http://localhost:3000";