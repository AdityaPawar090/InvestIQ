import React from "react";
import { Link } from "react-router-dom";
import { DASHBOARD_URL } from "../config";

function OpenAccount() {
  return (
    <section
      className="container my-5 py-5 text-center rounded-4"
      style={{
        background: "linear-gradient(135deg, #2563EB, #1E40AF)",
        color: "#fff",
      }}
    >
      <div className="row justify-content-center">

        <div className="col-lg-8">

          <span
            className="badge bg-light text-primary px-3 py-2 mb-4"
            style={{ fontSize: "14px" }}
          >
            🚀 Ready to Start?
          </span>

          <h2 className="display-5 fw-bold mb-4">
            Start Investing Smarter with InvestIQ
          </h2>

          <p
            className="fs-5 mb-5"
            style={{ color: "rgba(255,255,255,0.9)" }}
          >
            Experience AI-powered portfolio analysis, real-time market tracking,
            smart watchlists, and an intuitive dashboard—all in one platform.
          </p>

          <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">

            <Link
              to="/signup"
              className="btn btn-light btn-lg px-5 rounded-pill fw-semibold"
            >
              Create Free Account
            </Link>

            
              href={DASHBOARD_URL}
              className="btn btn-outline-light btn-lg px-5 rounded-pill"
            >
              View Dashboard
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}

export default OpenAccount;