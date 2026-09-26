import React from "react";
import { Link } from "react-router-dom";
import { DASHBOARD_URL } from "../../config";

function Hero() {
  return (
    <section className="container py-5" style={{ minHeight: "85vh", display: "flex", alignItems: "center" }}>
      <div className="row align-items-center w-100 gy-5">

        {/* Left Section: 1.1fr dominance */}
        <div className="col-lg-6 col-xl-7 text-center text-lg-start">

          {/* Section Badge with Pulsing Dot */}
          <div className="mm-section-badge">
            <span className="mm-badge-dot"></span>
            <span>AI-Powered Wealth Engine</span>
          </div>

          {/* Calistoga Display Headline with Signature Gradient Text & Underline */}
          <h1
            className="mm-headline mb-4"
            style={{ fontSize: "clamp(2.6rem, 5vw, 4.2rem)", lineHeight: 1.08 }}
          >
            Invest Smarter with{" "}
            <span className="mm-headline-wrap">
              <span className="mm-gradient-text">InvestIQ</span>
              <span className="mm-gradient-underline"></span>
            </span>
          </h1>

          <p
            className="mb-4 text-muted"
            style={{ fontSize: "1.15rem", lineHeight: 1.75, maxWidth: "560px" }}
          >
            A minimal, intelligent platform engineered for modern investors.
            Manage live holdings, execute simulated trades, and unlock
            real-time AI market insights with zero friction.
          </p>

          {/* CTAs */}
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start pt-2">
            <Link to="/signup" className="mm-btn-primary">
              <span>Start Free Trial</span>
              <span className="mm-btn-arrow">→</span>
            </Link>

            <a
              href={DASHBOARD_URL}
              onClick={(e) => {
                e.preventDefault();
                window.location.href = DASHBOARD_URL;
              }}
              className="mm-btn-outline"
            >
              <span>Explore Dashboard</span>
            </a>
          </div>

          {/* Trust Metrics */}
          <div className="row mt-5 pt-3 g-4 text-center text-lg-start border-top" style={{ borderColor: "var(--mm-border)" }}>
            <div className="col-4">
              <div className="mm-mono fw-bold fs-4" style={{ color: "var(--mm-foreground)" }}>₹10Cr+</div>
              <small className="text-muted text-uppercase" style={{ letterSpacing: "0.08em", fontSize: "0.75rem" }}>Assets Tracked</small>
            </div>

            <div className="col-4">
              <div className="mm-mono fw-bold fs-4" style={{ color: "var(--mm-foreground)" }}>5,000+</div>
              <small className="text-muted text-uppercase" style={{ letterSpacing: "0.08em", fontSize: "0.75rem" }}>Active Traders</small>
            </div>

            <div className="col-4">
              <div className="mm-mono fw-bold fs-4" style={{ color: "var(--mm-accent)" }}>&lt; 50ms</div>
              <small className="text-muted text-uppercase" style={{ letterSpacing: "0.08em", fontSize: "0.75rem" }}>Market Latency</small>
            </div>
          </div>

        </div>

        {/* Right Section: Living Interactive Graphic */}
        <div className="col-lg-6 col-xl-5 text-center position-relative">
          <div
            className="position-relative mx-auto"
            style={{ maxWidth: "480px", minHeight: "440px", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            {/* Ambient Accent Radial Glow */}
            <div
              style={{
                position: "absolute",
                width: "360px",
                height: "360px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(0, 82, 255, 0.18) 0%, transparent 70%)",
                filter: "blur(50px)",
                zIndex: 0,
              }}
            />

            {/* Rotating Decorative Dashed Ring */}
            <div
              className="mm-rotating-ring"
              style={{
                position: "absolute",
                width: "410px",
                height: "410px",
                borderRadius: "50%",
                border: "2px dashed rgba(0, 82, 255, 0.25)",
                pointerEvents: "none",
                zIndex: 1,
              }}
            />

            {/* Main Central Card */}
            <div
              className="mm-card position-relative text-start p-4"
              style={{
                width: "100%",
                maxWidth: "400px",
                zIndex: 2,
                borderRadius: "var(--mm-radius-xl)",
                background: "var(--mm-card)",
                boxShadow: "var(--mm-shadow-xl)",
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center gap-2">
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "8px",
                      background: "var(--mm-gradient)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: "0.85rem",
                      fontWeight: "700",
                    }}
                  >
                    IQ
                  </div>
                  <div>
                    <h6 className="mb-0 fw-bold">Live Portfolio</h6>
                    <small className="text-muted" style={{ fontSize: "0.75rem" }}>NSE Real-time</small>
                  </div>
                </div>

                <span
                  className="badge rounded-pill"
                  style={{
                    background: "rgba(16, 185, 129, 0.12)",
                    color: "#10B981",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    padding: "6px 12px",
                  }}
                >
                  ● Active
                </span>
              </div>

              <div className="mb-3">
                <small className="text-muted d-block" style={{ fontSize: "0.8rem" }}>Total Valuation</small>
                <h3 className="fw-bold mb-0 mm-mono" style={{ fontSize: "1.8rem" }}>₹ 4,82,450.00</h3>
                <small style={{ color: "#10B981", fontWeight: 600 }}>▲ +₹18,240 (4.15%) today</small>
              </div>

              {/* Sparkline Graphic */}
              <svg width="100%" height="60" viewBox="0 0 300 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="sparkGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0052FF" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#0052FF" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 45 L35 40 L70 48 L105 30 L140 34 L175 22 L210 26 L245 12 L280 18 L300 8"
                  stroke="#0052FF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M0 45 L35 40 L70 48 L105 30 L140 34 L175 22 L210 26 L245 12 L280 18 L300 8 L300 60 L0 60 Z"
                  fill="url(#sparkGradient)"
                />
              </svg>

              <hr className="my-3" style={{ borderColor: "var(--mm-border)" }} />

              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                  <span style={{ fontSize: "1rem" }}>⚡</span>
                  <small className="fw-semibold">AI Sentiment</small>
                </div>
                <span className="mm-mono fw-bold" style={{ color: "var(--mm-accent)", fontSize: "0.85rem" }}>
                  BULLISH (88%)
                </span>
              </div>
            </div>

            {/* Floating Card 1: Top Right */}
            <div
              className="mm-float-1 position-absolute"
              style={{
                top: "-24px",
                right: "-20px",
                zIndex: 3,
                background: "var(--mm-card)",
                border: "1px solid var(--mm-border)",
                borderRadius: "var(--mm-radius-md)",
                padding: "12px 18px",
                boxShadow: "var(--mm-shadow-lg)",
                textAlign: "left",
              }}
            >
              <div className="d-flex align-items-center gap-2">
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10B981" }} />
                <span className="fw-bold mm-mono" style={{ fontSize: "0.85rem" }}>NIFTY 50</span>
              </div>
              <div className="mm-mono fw-semibold" style={{ fontSize: "0.95rem", color: "#10B981" }}>
                ▲ +1.42%
              </div>
            </div>

            {/* Floating Card 2: Bottom Left */}
            <div
              className="mm-float-2 position-absolute"
              style={{
                bottom: "-24px",
                left: "-20px",
                zIndex: 3,
                background: "var(--mm-card)",
                border: "1px solid var(--mm-border)",
                borderRadius: "var(--mm-radius-md)",
                padding: "12px 18px",
                boxShadow: "var(--mm-shadow-lg)",
                textAlign: "left",
              }}
            >
              <small className="text-muted d-block" style={{ fontSize: "0.75rem" }}>AI Health Score</small>
              <div className="d-flex align-items-center gap-2">
                <span className="fw-bold mm-mono" style={{ color: "var(--mm-accent)", fontSize: "1.1rem" }}>94 / 100</span>
                <span className="badge bg-primary rounded-pill" style={{ fontSize: "0.65rem", padding: "4px 8px" }}>Optimal</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;