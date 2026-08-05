import React, { useState } from "react";
import axios from "axios";

const AIStockAnalyzer = () => {
  const [stock, setStock] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeStock = async () => {
    if (!stock.trim()) return;

    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const res = await axios.post(
        "http://localhost:3002/api/ai/analyze-stock",
        { stock: stock.trim() },
        { withCredentials: true }
      );
      setAnalysis(res.data.analysis);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to analyze this stock right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card iq-ai-card" style={{ marginTop: 24 }}>
      <h2>🤖 AI Stock Analyzer</h2>

      <p className="iq-muted">
        Enter any stock name or symbol (e.g. RELIANCE.NS) to receive AI-powered analysis.
      </p>

      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Example: RELIANCE.NS"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && analyzeStock()}
          className="form-control"
        />

        <button className="btn btn-blue" onClick={analyzeStock} disabled={loading}>
          {loading ? "Analyzing…" : "Analyze"}
        </button>
      </div>

      {error && <p style={{ marginTop: "15px", color: "var(--iq-danger)" }}>{error}</p>}

      {analysis && (
        <div className="iq-panel" style={{ marginTop: 25 }}>
          <h4>{analysis.symbol}</h4>
          <p>
            <strong>Rating:</strong> {analysis.rating} &nbsp;|&nbsp;
            <strong> Risk:</strong> {analysis.riskLevel}
          </p>

          <p style={{ marginTop: "10px" }}>
            <strong>Strengths:</strong>
          </p>
          <ul>
            {analysis.strengths?.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>

          <p style={{ marginTop: "10px" }}>
            <strong>Risks:</strong>
          </p>
          <ul>
            {analysis.risks?.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>

          <p className="iq-muted" style={{ marginTop: "10px" }}>{analysis.summary}</p>
        </div>
      )}
    </div>
  );
};

export default AIStockAnalyzer;
