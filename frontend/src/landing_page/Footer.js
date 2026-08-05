import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      className="mt-5 pt-5 pb-4"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div className="container">

        <div className="row gy-4">

          {/* Logo & About */}
          <div className="col-lg-4 col-md-6">

            <h2 className="fw-bold text-primary">
              InvestIQ
            </h2>

            <p className="text-muted mt-3">
              InvestIQ is a modern AI-powered investment management platform
              built using the MERN stack. It helps users manage portfolios,
              analyze investments, and make smarter financial decisions.
            </p>

          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">

            <h5 className="fw-bold mb-3">
              Quick Links
            </h5>

            <ul className="list-unstyled">

              <li className="mb-2">
                <Link to="/" className="text-decoration-none text-muted">
                  Home
                </Link>
              </li>

              <li className="mb-2">
                <Link to="/about" className="text-decoration-none text-muted">
                  About
                </Link>
              </li>

              <li className="mb-2">
                <Link to="/products" className="text-decoration-none text-muted">
                  Features
                </Link>
              </li>

              <li className="mb-2">
                <Link to="/signup" className="text-decoration-none text-muted">
                  Sign Up
                </Link>
              </li>

            </ul>

          </div>

          {/* Features */}
          <div className="col-lg-3 col-md-6">

            <h5 className="fw-bold mb-3">
              Features
            </h5>

            <ul className="list-unstyled text-muted">

              <li className="mb-2">🤖 AI Portfolio Advisor</li>

              <li className="mb-2">📊 Portfolio Dashboard</li>

              <li className="mb-2">⭐ Smart Watchlist</li>

              <li className="mb-2">💬 Finance Chatbot</li>

            </ul>

          </div>

          {/* Contact */}
          <div className="col-lg-3 col-md-6">

            <h5 className="fw-bold mb-3">
              Contact
            </h5>

            <p className="text-muted mb-2">
              📧 investiq.project@gmail.com
            </p>

            <p className="text-muted mb-2">
              📍 Pune, Maharashtra
            </p>

            <p className="text-muted">
              💻 MERN Stack Portfolio Project
            </p>

          </div>

        </div>

        <hr className="my-4" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">

          <p className="text-muted mb-2 mb-md-0">
            © 2026 InvestIQ. All Rights Reserved.
          </p>

          <div>

            <a
              href="https://github.com/AdityaPawar090"
              target="_blank"
              rel="noreferrer"
              className="text-decoration-none me-4"
            >
              GitHub
            </a>

            <a
              href="#"
              className="text-decoration-none"
            >
              LinkedIn
            </a>

          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;