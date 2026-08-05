import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="container py-5">
      <div className="row align-items-center">

        {/* Left Section */}
        <div className="col-lg-6 text-center text-lg-start">

          <span
            className="badge rounded-pill bg-primary mb-3 px-3 py-2"
            style={{ fontSize: "14px" }}
          >
            🚀 AI Powered Investment Platform
          </span>

          <h1
            className="fw-bold mb-4"
            style={{ fontSize: "3.3rem", lineHeight: "1.2" }}
          >
            Invest Smarter with <span className="text-primary">InvestIQ</span>
          </h1>

          <p
            className="text-secondary mb-4"
            style={{ fontSize: "18px", lineHeight: "1.8" }}
          >
            Manage your investments, monitor your portfolio, analyze market
            trends, and receive AI-powered insights to make better financial
            decisions.
          </p>

          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">

            <Link
              to="/signup"
              className="btn btn-primary btn-lg px-4 rounded-pill"
            >
              Get Started
            </Link>

            <a
              href="http://localhost:3001"
              className="btn btn-outline-primary btn-lg px-4 rounded-pill"
            >
              Open Dashboard
            </a>

          </div>

          {/* Stats */}
          <div className="row mt-5 text-center text-lg-start">

            <div className="col-4">
              <h3 className="fw-bold text-primary">5K+</h3>
              <p className="text-muted">Users</p>
            </div>

            <div className="col-4">
              <h3 className="fw-bold text-primary">₹10Cr+</h3>
              <p className="text-muted">Assets Tracked</p>
            </div>

            <div className="col-4">
              <h3 className="fw-bold text-primary">24/7</h3>
              <p className="text-muted">AI Assistant</p>
            </div>

          </div>

        </div>

        {/* Right Section */}
        <div className="col-lg-6 text-center mt-5 mt-lg-0">

          <img
            src="media/images/homehero.png"
            alt="InvestIQ Dashboard"
            className="img-fluid rounded-4 shadow-lg"
            style={{ maxWidth: "95%" }}
          />

        </div>

      </div>
    </section>
  );
}

export default Hero;