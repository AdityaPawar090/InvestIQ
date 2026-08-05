import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { usePortfolio } from "./PortfolioContext";

const Summary = () => {
  const navigate = useNavigate();
  const { holdings, livePrices, wallet, loading } = usePortfolio();
  const [orders, setOrders] = useState([]);

  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const userName = storedUser?.fullName?.split(" ")[0] || "there";

  useEffect(() => {
    axios
      .get("http://localhost:3002/allOrders", { withCredentials: true })
      .then((res) => setOrders(res.data.slice(0, 5)))
      .catch(() => {});
  }, []);

  const totalInvestment = holdings.reduce((acc, s) => acc + s.avg * s.qty, 0);
  const currentValue = holdings.reduce((acc, s) => {
    const live = livePrices[s.name]?.price || s.price;
    return acc + live * s.qty;
  }, 0);
  const profitLoss = currentValue - totalInvestment;
  const profitPercent = totalInvestment > 0 ? ((profitLoss / totalInvestment) * 100).toFixed(2) : "0.00";

  const dayChange = holdings.reduce((acc, s) => {
    const change = livePrices[s.name]?.change || 0;
    return acc + change * s.qty;
  }, 0);

  const riskLabel =
    holdings.length === 0 ? "N/A" : holdings.length < 4 ? "High" : holdings.length < 8 ? "Medium" : "Low";

  return (
    <div className="container-fluid py-2">
      {/* Hero */}
      <div className="iq-hero-card mb-4">
        <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
          <div>
            <h2 className="fw-bold mb-1">👋 Welcome back, {userName}</h2>
            <p className="mb-0" style={{ opacity: 0.85 }}>
              Here's your live portfolio snapshot for today.
            </p>
          </div>

          <div className="text-end">
            <p className="mb-0" style={{ opacity: 0.8, fontSize: 14 }}>
              Portfolio Value
            </p>
            <h1 className="fw-bold mb-0">
              ₹{currentValue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
            </h1>
            <small style={{ opacity: 0.9 }}>
              {dayChange >= 0 ? "▲" : "▼"} ₹{Math.abs(dayChange).toFixed(2)} today
            </small>
          </div>
        </div>
      </div>

      {loading && <p>Loading your portfolio…</p>}

      {/* Stat cards */}
      <div className="row g-4">
        <div className="col-md-3">
          <div className="iq-stat-card">
            <div className="iq-stat-icon" style={{ background: "#f0fdfa" }}>👛</div>
            <h6 className="text-muted mb-1">Wallet Balance</h6>
            <h3 className="mb-0">₹{wallet !== null ? wallet.toLocaleString("en-IN", { maximumFractionDigits: 0 }) : "…"}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="iq-stat-card">
            <div className="iq-stat-icon" style={{ background: "rgba(251,146,60,0.15)" }}>💰</div>
            <h6 className="text-muted mb-1">Total Investment</h6>
            <h3 className="mb-0">₹{totalInvestment.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="iq-stat-card">
            <div
              className="iq-stat-icon"
              style={{ background: profitLoss >= 0 ? "rgba(52,211,153,0.15)" : "rgba(248,113,113,0.15)" }}
            >
              {profitLoss >= 0 ? "📈" : "📉"}
            </div>
            <h6 className="text-muted mb-1">Overall P/L</h6>
            <h3 className={profitLoss >= 0 ? "profit mb-0" : "loss mb-0"}>
              ₹{profitLoss.toFixed(0)} ({profitPercent}%)
            </h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="iq-stat-card">
            <div className="iq-stat-icon" style={{ background: "rgba(252,211,77,0.18)" }}>💼</div>
            <h6 className="text-muted mb-1">Total Holdings</h6>
            <h3 className="mb-0">{holdings.length}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="iq-stat-card">
            <div className="iq-stat-icon" style={{ background: "rgba(251,191,36,0.18)" }}>⚖️</div>
            <h6 className="text-muted mb-1">Risk Score</h6>
            <h3 className="mb-0 text-warning">{riskLabel}</h3>
            <small className="text-muted">Based on portfolio breadth</small>
          </div>
        </div>
      </div>

      {/* AI Advisor */}
      <div className="card mt-4">
        <div className="card-body">
          <h4>🤖 AI Portfolio Advisor</h4>
          <p className="text-muted mt-2">
            {holdings.length === 0
              ? "You don't have any holdings yet — add some to get personalized AI insights."
              : "Get a full AI breakdown of your risk, diversification, and recommendations."}
          </p>
          <button className="btn btn-primary" onClick={() => navigate("/holdings")}>
            Analyze Portfolio
          </button>
        </div>
      </div>

      {/* Recent Activity — real orders */}
      <div className="card mt-4">
        <div className="card-body">
          <h4>🕒 Recent Activity</h4>
          {orders.length === 0 ? (
            <p className="text-muted mt-3">No orders yet. Buy a stock from your Watchlist to see it here.</p>
          ) : (
            <ul className="list-group list-group-flush mt-3">
              {orders.map((o) => (
                <li key={o._id} className="list-group-item d-flex justify-content-between">
                  <span>
                    <strong style={{ color: o.mode === "BUY" ? "var(--iq-success)" : "var(--iq-danger)" }}>
                      {o.mode}
                    </strong>{" "}
                    {o.qty} shares of {o.name} @ ₹{o.price}
                  </span>
                  <small className="text-muted">
                    {o.createdAt ? new Date(o.createdAt).toLocaleDateString() : ""}
                  </small>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Summary;
