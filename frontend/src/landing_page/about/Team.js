import React from "react";

function Team() {
  return (
    <section className="container py-5">

      <div className="text-center mb-5">
        <span className="badge bg-primary px-3 py-2 mb-3">
          Project Overview
        </span>

        <h2 className="fw-bold">
          Built as a Modern Full-Stack Investment Platform
        </h2>

        <p className="text-muted fs-5 mt-3">
          InvestIQ demonstrates full-stack web development using the MERN stack
          while integrating modern UI design, authentication, portfolio
          management, and AI-powered financial features.
        </p>
      </div>

      <div className="row g-4">

        <div className="col-lg-6">
          <div className="card border-0 shadow-sm h-100">

            <div className="card-body p-4">

              <h4 className="fw-bold mb-4">
                🚀 Project Highlights
              </h4>

              <ul className="list-group list-group-flush">

                <li className="list-group-item">
                  ✔ Full Stack MERN Application
                </li>

                <li className="list-group-item">
                  ✔ Secure User Authentication
                </li>

                <li className="list-group-item">
                  ✔ Portfolio & Holdings Dashboard
                </li>

                <li className="list-group-item">
                  ✔ Orders and Positions Management
                </li>

                <li className="list-group-item">
                  ✔ Responsive User Interface
                </li>

                <li className="list-group-item">
                  ✔ AI-Powered Investment Features (Upcoming)
                </li>

              </ul>

            </div>

          </div>
        </div>

        <div className="col-lg-6">
          <div className="card border-0 shadow-sm h-100">

            <div className="card-body p-4">

              <h4 className="fw-bold mb-4">
                💻 Tech Stack
              </h4>

              <div className="row">

                <div className="col-6 mb-3">
                  <span className="badge bg-primary p-2 w-100">
                    React.js
                  </span>
                </div>

                <div className="col-6 mb-3">
                  <span className="badge bg-success p-2 w-100">
                    Node.js
                  </span>
                </div>

                <div className="col-6 mb-3">
                  <span className="badge bg-dark p-2 w-100">
                    Express.js
                  </span>
                </div>

                <div className="col-6 mb-3">
                  <span className="badge bg-warning text-dark p-2 w-100">
                    MongoDB
                  </span>
                </div>

                <div className="col-6 mb-3">
                  <span className="badge bg-info text-dark p-2 w-100">
                    Bootstrap
                  </span>
                </div>

                <div className="col-6 mb-3">
                  <span className="badge bg-danger p-2 w-100">
                    JWT Auth
                  </span>
                </div>

              </div>

              <hr />

              <h5 className="fw-bold">
                🎯 Future Roadmap
              </h5>

              <p className="text-muted mb-0">
                The next version of InvestIQ will include an AI Portfolio
                Advisor, Finance Chatbot, Smart Watchlist, portfolio analytics,
                personalized insights, and market trend visualization.
              </p>

            </div>

          </div>
        </div>

      </div>

    </section>
  );
}

export default Team;