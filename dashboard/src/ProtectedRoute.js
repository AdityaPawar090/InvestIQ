import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, LANDING_URL } from "./config";

// Since the auth token now lives in an httpOnly cookie (not readable by JS),
// we verify the session by asking the backend who we are, instead of just
// checking for a token string in localStorage.
const ProtectedRoute = ({ children }) => {
  const [status, setStatus] = useState("checking"); // "checking" | "authed" | "guest"

  useEffect(() => {
    axios
      .get(`${API_URL}/api/auth/me`, { withCredentials: true })
      .then(() => setStatus("authed"))
      .catch(() => setStatus("guest"));
  }, []);

  if (status === "checking") {
    return <div style={{ padding: 40, textAlign: "center" }}>Checking session...</div>;
  }

  if (status === "guest") {
    // The dashboard and landing/login page are separate apps on different
    // ports, so react-router's <Navigate> (same-app only) won't work here —
    // a real browser redirect is needed to cross apps.
    window.location.href = `${LANDING_URL}/login`;
    return null;
  }

  return children;
};

export default ProtectedRoute;