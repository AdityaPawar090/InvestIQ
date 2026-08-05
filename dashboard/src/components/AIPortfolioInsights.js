import React, { useEffect, useState } from "react";
import axios from "axios";


const AIPortfolioInsights = () => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3002/api/ai/portfolio-insights", { withCredentials: true })
      .then((res) => setInsights(res.data.insights))
      .catch((err) =>
        setError(err.response?.data?.message || "Unable to load AI insights right now.")
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card iq-ai-card">
      <h2 style={{ marginBottom: "20px" }}>🤖 AI Portfolio Insights</h2>

      {loading && <p className="iq-muted">Analyzing your portfolio…</p>}

      {error && <p style={{ color: "var(--iq-danger)" }}>{error}</p>}

      {insights && (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: "20px",
            }}
          >
            <Card
              title="Portfolio Score"
              value={insights.score !== null ? `${insights.score} / 100` : "N/A"}
              accent="score"
            />
            <Card title="Risk Level" value={insights.riskLevel} accent="risk" />
            <Card title="Diversification" value={insights.diversification} accent="div" />
            <Card title="Best Stock" value={insights.bestStock} accent="best" />
          </div>

          <div className="iq-panel" style={{ marginTop: 30, borderLeft: "5px solid var(--iq-primary)" }}>
            <h4>AI Recommendation</h4>
            <p className="iq-muted" style={{ marginTop: "10px" }}>{insights.recommendation}</p>
          </div>
        </>
      )}
    </div>
  );
};

const Card = ({ title, value, accent }) => (
  <div className={`iq-insight-card iq-insight-${accent}`}>
    <h5>{title}</h5>
    <h2 style={{ marginTop: "12px" }}>{value}</h2>
  </div>
);

export default AIPortfolioInsights;
