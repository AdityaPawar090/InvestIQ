import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import UserMenu from "./UserMenu";
import Logo from "../Logo";
import { useTheme } from "../ThemeContext";

const TopBar = () => {
  const { dark, toggleTheme } = useTheme();
  const [triggeredCount, setTriggeredCount] = useState(0);

  useEffect(() => {
    const checkAlerts = () => {
      axios
        .get("http://localhost:3002/api/alerts/check", { withCredentials: true })
        .then((res) => {
          if (res.data.triggered?.length) {
            setTriggeredCount((c) => c + res.data.triggered.length);
          }
        })
        .catch(() => {});
    };

    checkAlerts();
    const interval = setInterval(checkAlerts, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-white border-bottom shadow-sm py-3">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          {/* Left */}
          <a
            href="http://localhost:3000"
            className="d-flex align-items-center gap-2 text-decoration-none"
            title="Back to InvestIQ home"
          >
            <Logo size={36} />
            <div>
              <h3 className="fw-bold m-0 iq-brand-text">
                InvestIQ
              </h3>
              <small className="text-muted">Your live investing dashboard</small>
            </div>
          </a>

          {/* Right */}
          <div className="d-flex align-items-center gap-3">
            <Link
              to="/alerts"
              className="btn btn-light border position-relative"
              title="Price Alerts"
              onClick={() => setTriggeredCount(0)}
            >
              🔔
              {triggeredCount > 0 && (
                <span
                  className="badge bg-danger rounded-pill"
                  style={{ position: "absolute", top: -6, right: -6 }}
                >
                  {triggeredCount}
                </span>
              )}
            </Link>

            <button
              className="btn btn-light border"
              title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              onClick={toggleTheme}
            >
              {dark ? "☀️" : "🌙"}
            </button>

            <UserMenu />
          </div>
        </div>
      </div>

      <Menu />
    </header>
  );
};

export default TopBar;
