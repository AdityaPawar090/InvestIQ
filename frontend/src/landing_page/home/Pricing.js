import React from "react";

function Education() {
  return (
    <section className="container py-5">

      <div className="row align-items-center">

        {/* Left Side */}
        <div className="col-lg-6 text-center mb-5 mb-lg-0">

          <img
            src="media/images/education.svg"
            alt="InvestIQ Workflow"
            className="img-fluid"
            style={{ maxWidth: "80%" }}
          />

        </div>

        {/* Right Side */}
        <div className="col-lg-6">

          <span className="badge bg-primary mb-3 px-3 py-2">
            How It Works
          </span>

          <h2 className="fw-bold mb-4">
            Start Your Investment Journey in 4 Simple Steps
          </h2>

          <div className="mb-4">
            <h5 className="fw-bold">
              1️⃣ Create Your Account
            </h5>

            <p className="text-muted">
              Register securely and access your personalized investment dashboard.
            </p>
          </div>

          <div className="mb-4">
            <h5 className="fw-bold">
              2️⃣ Build Your Portfolio
            </h5>

            <p className="text-muted">
              Add stocks, manage holdings, monitor positions, and organize your watchlist.
            </p>
          </div>

          <div className="mb-4">
            <h5 className="fw-bold">
              3️⃣ Get AI Insights
            </h5>

            <p className="text-muted">
              Analyze your portfolio with AI-powered recommendations, market summaries,
              and investment guidance.
            </p>
          </div>

          <div className="mb-4">
            <h5 className="fw-bold">
              4️⃣ Track Your Growth
            </h5>

            <p className="text-muted">
              Visualize your investment performance with interactive charts and analytics.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Education;