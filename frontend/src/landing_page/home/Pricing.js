import React from "react";

function Pricing() {
  const steps = [
    {
      num: "01",
      title: "Create Account",
      desc: "Instant registration with zero KYC delays. Receive immediate access to your live terminal.",
      badge: "Instant",
    },
    {
      num: "02",
      title: "Fund Virtual Wallet",
      desc: "Get credited with ₹1,00,000 in virtual paper capital to test strategies with zero financial risk.",
      badge: "₹1,00,000",
    },
    {
      num: "03",
      title: "Analyze with AI",
      desc: "Evaluate any stock across fundamentals and live sentiment with Gemini-powered stock diagnosis.",
      badge: "AI Powered",
    },
    {
      num: "04",
      title: "Execute & Grow",
      desc: "Place simulated BUY & SELL orders against real-time NSE market prices and track live P&L.",
      badge: "Live NSE",
    },
  ];

  return (
    <section className="container py-5 my-5">
      {/* Header */}
      <div className="text-center mb-5 pb-3">
        <div className="mm-section-badge">
          <span className="mm-badge-dot"></span>
          <span>Simple Onboarding</span>
        </div>

        <h2 className="mm-headline display-5 mb-3">
          Four Steps to <span className="mm-gradient-text">Intelligent Investing</span>
        </h2>

        <p className="fs-5 text-muted mx-auto" style={{ maxWidth: "580px" }}>
          A friction-free transition from registration to live market decision-making.
        </p>
      </div>

      {/* 4 Steps Grid */}
      <div className="row g-4">
        {steps.map((step, idx) => (
          <div key={idx} className="col-md-6 col-lg-3">
            <div className="mm-card h-100 p-4 d-flex flex-column position-relative">
              {/* Top Accent Row */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span
                  className="mm-mono fw-bold"
                  style={{
                    fontSize: "2rem",
                    lineHeight: 1,
                    color: "var(--mm-accent)",
                    opacity: 0.85,
                  }}
                >
                  {step.num}
                </span>

                <span
                  className="badge rounded-pill"
                  style={{
                    background: "rgba(0, 82, 255, 0.08)",
                    color: "var(--mm-accent)",
                    fontFamily: "var(--mm-font-mono)",
                    fontSize: "0.75rem",
                    padding: "6px 12px",
                  }}
                >
                  {step.badge}
                </span>
              </div>

              <h5 className="fw-bold mb-2">{step.title}</h5>

              <p className="text-muted mb-0" style={{ fontSize: "0.95rem", lineHeight: 1.65 }}>
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Pricing;