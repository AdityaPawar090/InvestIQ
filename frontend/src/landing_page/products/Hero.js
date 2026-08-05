import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="container py-5 border-bottom">

      <div className="row justify-content-center text-center">

        <div className="col-lg-9">

          <span className="badge bg-primary px-3 py-2 mb-3">
            🚀 InvestIQ Features
          </span>

          <h1 className="display-4 fw-bold mb-4">
            Everything You Need for Smarter Investing
          </h1>

          <p
            className="text-muted fs-5"
            style={{ lineHeight: "1.8" }}
          >
            InvestIQ combines portfolio management, AI-powered investment
            insights, secure authentication, interactive dashboards, and
            intelligent analytics into one modern platform.
          </p>

          <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">

            <span className="badge bg-light text-dark border p-3">
              🤖 AI Advisor
            </span>

            <span className="badge bg-light text-dark border p-3">
              📊 Dashboard
            </span>

            <span className="badge bg-light text-dark border p-3">
              ⭐ Watchlist
            </span>

            <span className="badge bg-light text-dark border p-3">
              🔐 Secure Login
            </span>

            <span className="badge bg-light text-dark border p-3">
              📈 Analytics
            </span>

          </div>

          <div className="mt-5">

            <Link
              to="/signup"
              className="btn btn-primary btn-lg px-5 rounded-pill me-3"
            >
              Get Started
            </Link>

            <a
              href="http://localhost:3001"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-primary btn-lg px-5 rounded-pill"
            >
              Open Dashboard
            </a>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;