import React from "react";
import { Link } from "react-router-dom";

function Education() {
  return (
    <section className="container py-5 my-5">
      <div className="row align-items-center gy-5">

        {/* Left Column: Headline & Overview */}
        <div className="col-lg-5 text-center text-lg-start">
          <div className="mm-section-badge">
            <span className="mm-badge-dot"></span>
            <span>Knowledge &amp; Community</span>
          </div>

          <h2 className="mm-headline display-5 mb-4">
            Free &amp; Open Market <span className="mm-gradient-text">Education</span>
          </h2>

          <p className="text-muted fs-5 mb-4" style={{ lineHeight: 1.75 }}>
            Master trading mechanics, fundamental analysis, and algorithmic risk management
            with our curated, zero-cost knowledge base.
          </p>

          <Link to="/products" className="mm-btn-outline">
            <span>Explore All Resources</span>
            <span>→</span>
          </Link>
        </div>

        {/* Right Column: 2 Elevated Cards */}
        <div className="col-lg-7 ps-lg-5">
          <div className="row g-4">

            <div className="col-12">
              <div className="mm-card p-4">
                <div className="d-flex align-items-start gap-4">
                  <div className="mm-icon-container" style={{ flexShrink: 0 }}>
                    📚
                  </div>
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <h5 className="fw-bold mb-0">Trading Mastery Curriculum</h5>
                      <span className="badge rounded-pill bg-light text-dark border" style={{ fontSize: "0.75rem" }}>
                        Beginner to Pro
                      </span>
                    </div>
                    <p className="text-muted mb-3" style={{ fontSize: "0.95rem" }}>
                      In-depth modules covering price action, macroeconomic indicators, portfolio balance theory, and disciplined position sizing.
                    </p>
                    <Link to="/about" className="fw-semibold text-decoration-none d-inline-flex align-items-center gap-1" style={{ color: "var(--mm-accent)", fontSize: "0.9rem" }}>
                      Read Curriculum <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12">
              <div className="mm-card p-4">
                <div className="d-flex align-items-start gap-4">
                  <div className="mm-icon-container" style={{ flexShrink: 0 }}>
                    💬
                  </div>
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <h5 className="fw-bold mb-0">Investor Community &amp; Q&amp;A</h5>
                      <span className="badge rounded-pill bg-light text-dark border" style={{ fontSize: "0.75rem" }}>
                        Live Forum
                      </span>
                    </div>
                    <p className="text-muted mb-3" style={{ fontSize: "0.95rem" }}>
                      Engage with thousands of active investors, share technical chart setups, discuss quarterly earnings reports, and validate trade ideas.
                    </p>
                    <Link to="/support" className="fw-semibold text-decoration-none d-inline-flex align-items-center gap-1" style={{ color: "var(--mm-accent)", fontSize: "0.9rem" }}>
                      Join Community <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default Education;