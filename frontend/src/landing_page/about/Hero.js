import React from "react";

function Hero() {
  return (
    <section className="container py-5">

      {/* Heading */}
      <div className="row justify-content-center text-center mb-5">

        <div className="col-lg-9">

          <span className="badge bg-primary px-3 py-2 mb-3">
            About InvestIQ
          </span>

          <h1 className="display-4 fw-bold mb-4">
            Smarter Investing Begins with Smarter Decisions
          </h1>

          <p
            className="text-muted fs-5"
            style={{ lineHeight: "1.8" }}
          >
            InvestIQ is a modern AI-powered investment management platform built
            to simplify portfolio tracking, investment analysis, and financial
            decision-making. It combines the power of the MERN stack with
            intelligent features to deliver a clean and interactive investing
            experience.
          </p>

        </div>

      </div>

      {/* Content */}

      <div className="row g-5">

        {/* Left */}

        <div className="col-lg-6">

          <h3 className="fw-bold mb-3">
            🚀 Our Mission
          </h3>

          <p className="text-muted" style={{ lineHeight: "1.8" }}>
            Our mission is to make investing easier for everyone by combining
            intuitive design, real-time portfolio management, and AI-powered
            financial insights into a single platform.
          </p>

          <h3 className="fw-bold mt-5 mb-3">
            💡 Why InvestIQ?
          </h3>

          <p className="text-muted" style={{ lineHeight: "1.8" }}>
            Many investment platforms focus only on buying and selling stocks.
            InvestIQ goes a step further by helping users understand their
            investments, organize watchlists, and receive intelligent
            recommendations using AI.
          </p>

        </div>

        {/* Right */}

        <div className="col-lg-6">

          <h3 className="fw-bold mb-3">
            🛠 Technologies Used
          </h3>

          <ul className="list-group mb-4">

            <li className="list-group-item">
              React.js
            </li>

            <li className="list-group-item">
              Node.js & Express.js
            </li>

            <li className="list-group-item">
              MongoDB
            </li>

            <li className="list-group-item">
              JWT Authentication
            </li>

            <li className="list-group-item">
              Bootstrap 5
            </li>

            <li className="list-group-item">
              OpenAI API (Upcoming AI Features)
            </li>

          </ul>

          <h3 className="fw-bold mb-3">
            🎯 Vision
          </h3>

          <p className="text-muted" style={{ lineHeight: "1.8" }}>
            We aim to transform InvestIQ into a complete investment companion
            that helps users monitor portfolios, discover investment
            opportunities, learn market concepts, and make informed financial
            decisions with the assistance of AI.
          </p>

        </div>

      </div>

    </section>
  );
}

export default Hero;