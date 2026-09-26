import React from "react";
import { Link } from "react-router-dom";
import { DASHBOARD_URL } from "../config";

function OpenAccount() {
  return (
    <section className="container my-5 py-4">
      <div
        className="text-center p-5 position-relative overflow-hidden"
        style={{
          backgroundColor: "var(--mm-card)",
          border: "1px solid var(--mm-border)",
          borderRadius: "var(--mm-radius-xl)",
          boxShadow: "var(--mm-shadow-xl)",
        }}
      >
        {/* Ambient Corner Glows */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0, 82, 255, 0.12) 0%, transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-100px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(77, 124, 255, 0.1) 0%, transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />

        <div className="row justify-content-center position-relative" style={{ zIndex: 1 }}>
          <div className="col-lg-8">

            <div className="mm-section-badge mb-3">
              <span className="mm-badge-dot"></span>
              <span>Instant Onboarding</span>
            </div>

            <h2 className="mm-headline display-5 mb-4">
              Ready to Elevate Your <span className="mm-gradient-text">Investment Game?</span>
            </h2>

            <p className="fs-5 text-muted mb-4 mx-auto" style={{ maxWidth: "620px", lineHeight: 1.75 }}>
              Join thousands of disciplined investors using InvestIQ to monitor portfolio health,
              simulate risk-free orders, and access real-time AI intelligence.
            </p>

            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 pt-2">
              <Link to="/signup" className="mm-btn-primary" style={{ padding: "14px 34px" }}>
                <span>Create Free Account</span>
                <span className="mm-btn-arrow">→</span>
              </Link>

              <a
                href={DASHBOARD_URL}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = DASHBOARD_URL;
                }}
                className="mm-btn-outline"
                style={{ padding: "14px 32px" }}
              >
                <span>Launch Dashboard</span>
              </a>
            </div>

            <div className="mt-4 pt-2">
              <small className="text-muted mm-mono" style={{ fontSize: "0.8rem", letterSpacing: "0.04em" }}>
                ✓ Zero KYC Required &nbsp;·&nbsp; ✓ ₹1,00,000 Paper Capital &nbsp;·&nbsp; ✓ Cancel Anytime
              </small>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default OpenAccount;