import React from "react";

function Stats() {
  return (
    <section className="mm-inverted-section my-5">
      <div className="container position-relative" style={{ zIndex: 1 }}>

        {/* Section Header */}
        <div className="text-center mb-5 pb-2">
          <div className="mm-section-badge mm-section-badge-light">
            <span className="mm-badge-dot"></span>
            <span>Platform Excellence</span>
          </div>

          <h2 className="mm-headline display-5 mb-3" style={{ color: "#FFFFFF" }}>
            Engineered for <span className="mm-gradient-text">Precision</span> & Clarity
          </h2>

          <p className="fs-5 mx-auto" style={{ maxWidth: "600px", color: "#94A3B8" }}>
            A disciplined architecture combining real-time NSE data feeds,
            low-latency portfolio math, and private AI analytics.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="row g-4">

          <div className="col-md-6 col-lg-3">
            <div className="mm-card h-100 p-4">
              <div className="mm-icon-container">
                🤖
              </div>
              <h5 className="fw-bold mb-2">AI Portfolio Advisor</h5>
              <p className="mb-3" style={{ fontSize: "0.95rem" }}>
                Continuous algorithmic risk profiling, diversification scores, and actionable rebalancing signals.
              </p>
              <div className="mt-auto pt-2 border-top" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <span className="mm-mono" style={{ fontSize: "0.75rem", color: "#60A5FA" }}>● Gemini Powered</span>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="mm-card h-100 p-4">
              <div className="mm-icon-container">
                📊
              </div>
              <h5 className="fw-bold mb-2">Real-Time Analytics</h5>
              <p className="mb-3" style={{ fontSize: "0.95rem" }}>
                Zero-lag live NSE quotes, automated P&amp;L calculations, and interactive charts.
              </p>
              <div className="mt-auto pt-2 border-top" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <span className="mm-mono" style={{ fontSize: "0.75rem", color: "#34D399" }}>● Sub-second Sync</span>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="mm-card h-100 p-4">
              <div className="mm-icon-container">
                ⭐
              </div>
              <h5 className="fw-bold mb-2">Smart Watchlist</h5>
              <p className="mb-3" style={{ fontSize: "0.95rem" }}>
                Personalized stock favorites, instant price alerts, and batch quotes in a clean layout.
              </p>
              <div className="mt-auto pt-2 border-top" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <span className="mm-mono" style={{ fontSize: "0.75rem", color: "#FBBF24" }}>● Dynamic Filters</span>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="mm-card h-100 p-4">
              <div className="mm-icon-container">
                🔐
              </div>
              <h5 className="fw-bold mb-2">Institutional Security</h5>
              <p className="mb-3" style={{ fontSize: "0.95rem" }}>
                HTTP-only hardened JWT cookies, encrypted credentials, and zero cross-site leak vulnerabilities.
              </p>
              <div className="mt-auto pt-2 border-top" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <span className="mm-mono" style={{ fontSize: "0.75rem", color: "#A78BFA" }}>● 256-bit Security</span>
              </div>
            </div>
          </div>

        </div>

        {/* Inverted Bottom Metric Strip */}
        <div
          className="row text-center mt-5 pt-5 g-4"
          style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}
        >
          <div className="col-6 col-md-3">
            <div className="mm-headline fs-1" style={{ color: "#FFFFFF" }}>10K+</div>
            <small className="mm-mono text-uppercase" style={{ color: "#94A3B8", letterSpacing: "0.08em", fontSize: "0.8rem" }}>
              Portfolio Reviews
            </small>
          </div>

          <div className="col-6 col-md-3">
            <div className="mm-headline fs-1" style={{ color: "#60A5FA" }}>99.4%</div>
            <small className="mm-mono text-uppercase" style={{ color: "#94A3B8", letterSpacing: "0.08em", fontSize: "0.8rem" }}>
              Calculation Accuracy
            </small>
          </div>

          <div className="col-6 col-md-3">
            <div className="mm-headline fs-1" style={{ color: "#FFFFFF" }}>24 / 7</div>
            <small className="mm-mono text-uppercase" style={{ color: "#94A3B8", letterSpacing: "0.08em", fontSize: "0.8rem" }}>
              Live Market Monitoring
            </small>
          </div>

          <div className="col-6 col-md-3">
            <div className="mm-headline fs-1" style={{ color: "#34D399" }}>0%</div>
            <small className="mm-mono text-uppercase" style={{ color: "#94A3B8", letterSpacing: "0.08em", fontSize: "0.8rem" }}>
              Paper Trading Risk
            </small>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Stats;