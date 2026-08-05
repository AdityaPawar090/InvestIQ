import React from "react";

function Stats() {
  return (
    <section className="container py-5">

      {/* Heading */}
      <div className="text-center mb-5">
        <h2 className="fw-bold display-6">
          Why Investors Choose <span className="text-primary">InvestIQ</span>
        </h2>

        <p className="text-muted fs-5 mt-3">
          A modern investment platform designed with AI, security, and simplicity
          in mind.
        </p>
      </div>

      <div className="row g-4">

        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100 text-center p-4">
            <div className="display-5 mb-3">🤖</div>
            <h4 className="fw-bold">AI Portfolio Advisor</h4>
            <p className="text-muted mb-0">
              Receive intelligent suggestions to improve your portfolio and reduce
              investment risk.
            </p>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100 text-center p-4">
            <div className="display-5 mb-3">📊</div>
            <h4 className="fw-bold">Real-Time Analytics</h4>
            <p className="text-muted mb-0">
              Track holdings, positions, and portfolio performance with
              interactive charts.
            </p>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100 text-center p-4">
            <div className="display-5 mb-3">⭐</div>
            <h4 className="fw-bold">Smart Watchlist</h4>
            <p className="text-muted mb-0">
              Save favorite stocks, add personal notes, and receive price alerts.
            </p>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100 text-center p-4">
            <div className="display-5 mb-3">🔐</div>
            <h4 className="fw-bold">Secure Authentication</h4>
            <p className="text-muted mb-0">
              User accounts are protected using JWT authentication and secure APIs.
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Statistics */}
      <div className="row text-center mt-5">

        <div className="col-6 col-md-3 mb-4">
          <h2 className="fw-bold text-primary">10K+</h2>
          <p className="text-muted">Portfolio Reviews</p>
        </div>

        <div className="col-6 col-md-3 mb-4">
          <h2 className="fw-bold text-primary">95%</h2>
          <p className="text-muted">User Satisfaction</p>
        </div>

        <div className="col-6 col-md-3 mb-4">
          <h2 className="fw-bold text-primary">24/7</h2>
          <p className="text-muted">AI Assistance</p>
        </div>

        <div className="col-6 col-md-3 mb-4">
          <h2 className="fw-bold text-primary">100%</h2>
          <p className="text-muted">Responsive Design</p>
        </div>

      </div>

    </section>
  );
}

export default Stats;