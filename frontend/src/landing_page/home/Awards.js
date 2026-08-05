import React from "react";

function Awards() {
  return (
    <section className="container py-5">

      <div className="row align-items-center">

        {/* Left Image */}
        <div className="col-lg-6 text-center mb-5 mb-lg-0">

          <img
            src="media/images/LargestBroker.svg"
            alt="InvestIQ Features"
            className="img-fluid"
            style={{ maxWidth: "85%" }}
          />

        </div>

        {/* Right Content */}
        <div className="col-lg-6">

          <span className="badge bg-primary mb-3 px-3 py-2">
            Why Choose InvestIQ?
          </span>

          <h2 className="fw-bold mb-4">
            Everything You Need for Smarter Investing
          </h2>

          <p className="text-secondary mb-4">
            InvestIQ combines portfolio tracking, AI-powered insights,
            real-time analytics, and an intuitive dashboard to help investors
            make confident financial decisions.
          </p>

          <div className="row">

            <div className="col-md-6 mb-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h5>🤖 AI Insights</h5>
                  <p className="text-muted mb-0">
                    Receive intelligent portfolio suggestions powered by AI.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h5>📈 Live Portfolio</h5>
                  <p className="text-muted mb-0">
                    Track holdings, orders, positions and investment growth.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h5>⭐ Smart Watchlist</h5>
                  <p className="text-muted mb-0">
                    Save your favorite stocks with notes and alerts.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h5>🔒 Secure Platform</h5>
                  <p className="text-muted mb-0">
                    JWT authentication and protected APIs keep your data safe.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Awards;