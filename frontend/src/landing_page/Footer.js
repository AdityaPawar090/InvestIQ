import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <footer
      className="pt-5 pb-4 mt-5"
      style={{
        backgroundColor: "var(--mm-card)",
        borderTop: "1px solid var(--mm-border)",
      }}
    >
      <div className="container">
        <div className="row gy-4 mb-5">

          {/* Logo & About */}
          <div className="col-lg-4 col-md-6">
            <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none mb-3">
              <Logo size={32} />
              <span className="iq-brand-text fs-4 fw-bold">InvestIQ</span>
            </Link>

            <p className="text-muted" style={{ fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "340px" }}>
              A modern, AI-augmented investment intelligence platform built for disciplined traders.
              Real-time portfolio management and simulated trade execution.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="mm-mono fw-bold text-uppercase mb-3" style={{ fontSize: "0.8rem", letterSpacing: "0.1em", color: "var(--mm-foreground)" }}>
              Platform
            </h6>

            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-decoration-none text-muted" style={{ fontSize: "0.95rem" }}>
                  Terminal
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-decoration-none text-muted" style={{ fontSize: "0.95rem" }}>
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/products" className="text-decoration-none text-muted" style={{ fontSize: "0.95rem" }}>
                  Features
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/pricing" className="text-decoration-none text-muted" style={{ fontSize: "0.95rem" }}>
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Capabilities */}
          <div className="col-lg-3 col-md-6 col-6">
            <h6 className="mm-mono fw-bold text-uppercase mb-3" style={{ fontSize: "0.8rem", letterSpacing: "0.1em", color: "var(--mm-foreground)" }}>
              Capabilities
            </h6>

            <ul className="list-unstyled text-muted" style={{ fontSize: "0.95rem" }}>
              <li className="mb-2">🤖 AI Portfolio Advisor</li>
              <li className="mb-2">📊 Live NSE Order Flow</li>
              <li className="mb-2">⭐ Real-Time Watchlist</li>
              <li className="mb-2">⚡ Gemini Stock Analysis</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-3 col-md-6">
            <h6 className="mm-mono fw-bold text-uppercase mb-3" style={{ fontSize: "0.8rem", letterSpacing: "0.1em", color: "var(--mm-foreground)" }}>
              Developer
            </h6>

            <p className="text-muted mb-2" style={{ fontSize: "0.95rem" }}>
              📍 Pune, Maharashtra, India
            </p>
            <p className="text-muted mb-2" style={{ fontSize: "0.95rem" }}>
              📧 investiq.project@gmail.com
            </p>
            <small className="mm-mono text-muted d-block mt-3" style={{ fontSize: "0.75rem" }}>
              FULL-STACK MERN ARCHITECTURE
            </small>
          </div>

        </div>

        <hr style={{ borderColor: "var(--mm-border)" }} />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center pt-2">
          <p className="text-muted mb-2 mb-md-0" style={{ fontSize: "0.85rem" }}>
            © {new Date().getFullYear()} InvestIQ. Designed with Minimalist Modern principles.
          </p>

          <div className="d-flex align-items-center gap-4">
            <a
              href="https://github.com/AdityaPawar090"
              target="_blank"
              rel="noreferrer"
              className="text-decoration-none text-muted"
              style={{ fontSize: "0.85rem" }}
            >
              GitHub
            </a>
            <span className="text-muted">·</span>
            <Link to="/support" className="text-decoration-none text-muted" style={{ fontSize: "0.85rem" }}>
              Support
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;