import React from "react";

function Awards() {
  return (
    <section className="container py-5 my-4">
      <div className="row align-items-center gy-5">

        {/* Left Visual: Interactive Ecosystem Showcase */}
        <div className="col-lg-5 text-center order-2 order-lg-1">
          <div
            className="mm-card position-relative text-start p-4 mx-auto"
            style={{
              maxWidth: "420px",
              borderRadius: "var(--mm-radius-xl)",
              border: "1px solid var(--mm-border)",
              boxShadow: "var(--mm-shadow-lg)",
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="mm-mono fw-bold" style={{ fontSize: "0.85rem", color: "var(--mm-accent)" }}>
                PORTFOLIO ANALYSIS
              </span>
              <span className="badge rounded-pill bg-light text-dark border" style={{ fontSize: "0.75rem" }}>
                AI Model v2.4
              </span>
            </div>

            <div className="p-3 mb-3 rounded-3" style={{ background: "var(--mm-muted)" }}>
              <div className="d-flex justify-content-between align-items-center mb-1">
                <span className="fw-semibold" style={{ fontSize: "0.9rem" }}>RELIANCE.NS</span>
                <span className="fw-bold mm-mono" style={{ color: "#10B981" }}>+2.35%</span>
              </div>
              <small className="text-muted d-block">Energy &amp; Conglomerate</small>
              <div className="progress mt-2" style={{ height: "4px" }}>
                <div className="progress-bar bg-primary" role="progressbar" style={{ width: "78%" }} />
              </div>
            </div>

            <div className="p-3 mb-3 rounded-3" style={{ background: "var(--mm-muted)" }}>
              <div className="d-flex justify-content-between align-items-center mb-1">
                <span className="fw-semibold" style={{ fontSize: "0.9rem" }}>TCS.NS</span>
                <span className="fw-bold mm-mono" style={{ color: "#10B981" }}>+1.18%</span>
              </div>
              <small className="text-muted d-block">IT &amp; Software Consulting</small>
              <div className="progress mt-2" style={{ height: "4px" }}>
                <div className="progress-bar bg-primary" role="progressbar" style={{ width: "64%" }} />
              </div>
            </div>

            <div
              className="p-3 rounded-3 mt-3 d-flex align-items-center gap-3"
              style={{
                background: "linear-gradient(135deg, rgba(0, 82, 255, 0.08), rgba(77, 124, 255, 0.04))",
                border: "1px solid rgba(0, 82, 255, 0.2)",
              }}
            >
              <span style={{ fontSize: "1.4rem" }}>💡</span>
              <div>
                <small className="fw-bold d-block" style={{ color: "var(--mm-accent)" }}>
                  AI Recommendation
                </small>
                <small className="text-muted">
                  High cash allocation detected. Consider accumulating high-beta stocks on pullbacks.
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="col-lg-7 order-1 order-lg-2 ps-lg-5">
          <div className="mm-section-badge">
            <span className="mm-badge-dot"></span>
            <span>Intelligent Ecosystem</span>
          </div>

          <h2 className="mm-headline display-5 mb-4">
            Everything You Need for <span className="mm-gradient-text">Confident Trading</span>
          </h2>

          <p className="text-muted fs-5 mb-4" style={{ lineHeight: 1.75 }}>
            InvestIQ brings together simulated order execution, deep AI diagnostic summaries,
            and real-time NSE data feeds into a unified, distraction-free environment.
          </p>

          <div className="row g-3">

            <div className="col-md-6">
              <div className="mm-card h-100 p-4">
                <div className="d-flex align-items-center gap-3 mb-2">
                  <div className="mm-icon-container" style={{ width: "42px", height: "42px", fontSize: "1.1rem", marginBottom: 0 }}>
                    🤖
                  </div>
                  <h5 className="fw-bold mb-0">AI Insight Engine</h5>
                </div>
                <p className="text-muted mb-0" style={{ fontSize: "0.95rem" }}>
                  Automated risk ratings, company strengths, and portfolio diversification metrics.
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="mm-card-featured h-100">
                <div className="mm-card-featured-inner p-4">
                  <div className="d-flex align-items-center gap-3 mb-2">
                    <div className="mm-icon-container" style={{ width: "42px", height: "42px", fontSize: "1.1rem", marginBottom: 0 }}>
                      ⚡
                    </div>
                    <h5 className="fw-bold mb-0">Zero-Risk Trading</h5>
                  </div>
                  <p className="text-muted mb-0" style={{ fontSize: "0.95rem" }}>
                    Simulated paper-trading wallet with ₹1,00,000 virtual balance to test strategies safely.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="mm-card h-100 p-4">
                <div className="d-flex align-items-center gap-3 mb-2">
                  <div className="mm-icon-container" style={{ width: "42px", height: "42px", fontSize: "1.1rem", marginBottom: 0 }}>
                    🔔
                  </div>
                  <h5 className="fw-bold mb-0">Dynamic Alerts</h5>
                </div>
                <p className="text-muted mb-0" style={{ fontSize: "0.95rem" }}>
                  Target price thresholds that monitor real-time NSE market shifts and notify you instantly.
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="mm-card h-100 p-4">
                <div className="d-flex align-items-center gap-3 mb-2">
                  <div className="mm-icon-container" style={{ width: "42px", height: "42px", fontSize: "1.1rem", marginBottom: 0 }}>
                    📰
                  </div>
                  <h5 className="fw-bold mb-0">Curated News</h5>
                </div>
                <p className="text-muted mb-0" style={{ fontSize: "0.95rem" }}>
                  Live financial news from verified market publishers synced directly to your watchlist.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default Awards;