import React, { useEffect, useState } from "react";
import axios from "axios";

const StockInfoModal = ({ name, mode, onClose }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setData(null);

    const fetchData = async () => {
      try {
        if (mode === "ai") {
          const res = await axios.post(
            "http://localhost:3002/api/ai/analyze-stock",
            { stock: `${name}.NS` },
            { withCredentials: true }
          );
          setData(res.data.analysis);
        } else {
          const res = await axios.get(`http://localhost:3002/api/stocks/${name}.NS`);
          setData(res.data);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load data right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [name, mode]);

  return (
    <div className="iq-modal-overlay" onClick={onClose}>
      <div className="iq-modal" onClick={(e) => e.stopPropagation()}>
        <button className="iq-modal-close" onClick={onClose}>✕</button>

        <h4>{mode === "ai" ? `🤖 AI Insight — ${name}` : `📊 ${name} Details`}</h4>

        {loading && <p className="text-muted mt-3">Loading…</p>}
        {error && <p style={{ color: "#ef4444" }} className="mt-3">{error}</p>}

        {data && mode === "ai" && (
          <div className="mt-3">
            <p>
              <strong>Rating:</strong> {data.rating} &nbsp;|&nbsp;
              <strong> Risk:</strong> {data.riskLevel}
            </p>
            <p><strong>Strengths:</strong></p>
            <ul>{data.strengths?.map((s, i) => <li key={i}>{s}</li>)}</ul>
            <p><strong>Risks:</strong></p>
            <ul>{data.risks?.map((r, i) => <li key={i}>{r}</li>)}</ul>
            <p className="text-muted">{data.summary}</p>
          </div>
        )}

        {data && mode === "details" && (
          <div className="row g-3 mt-2">
            <DetailItem label="Price" value={`₹${data.price?.toFixed?.(2) ?? data.price}`} />
            <DetailItem label="Change" value={`${data.changePercent?.toFixed?.(2)}%`} />
            <DetailItem label="Open" value={`₹${data.open}`} />
            <DetailItem label="Day High" value={`₹${data.high}`} />
            <DetailItem label="Day Low" value={`₹${data.low}`} />
            <DetailItem label="Prev Close" value={`₹${data.previousClose}`} />
            <DetailItem label="Volume" value={data.volume?.toLocaleString?.() ?? data.volume} />
            <DetailItem label="Market Cap" value={data.marketCap?.toLocaleString?.() ?? data.marketCap} />
          </div>
        )}
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div className="col-6">
    <small className="text-muted d-block">{label}</small>
    <p className="fw-semibold mb-0">{value ?? "—"}</p>
  </div>
);

export default StockInfoModal;
