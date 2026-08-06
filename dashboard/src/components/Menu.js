import React from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { API_URL, LANDING_URL } from "../config";

const menuItems = [
  { title: "Dashboard", path: "/", icon: "🏠" },
  { title: "Orders", path: "/orders", icon: "📋" },
  { title: "Holdings", path: "/holdings", icon: "💼" },
  { title: "Positions", path: "/positions", icon: "📈" },
  { title: "Funds", path: "/funds", icon: "💰" },
  { title: "News", path: "/news", icon: "📰" },
  { title: "Alerts", path: "/alerts", icon: "🔔" },
  { title: "AI Assistant", path: "/apps", icon: "🤖" },
];

const Menu = () => {
  const location = useLocation();

  const storedUser = JSON.parse(localStorage.getItem("user"));

  const userName = storedUser?.fullName || "User";
  const userEmail = storedUser?.email || "";

  const initials = userName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${API_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Logout request failed:", err);
    }

    localStorage.removeItem("user");

    // Go back to the landing app's login page
    window.location.href = `${LANDING_URL}/login`;
  };

  return (
    <div className="menu-container">

      {/* Logo */}
      <div className="text-center py-3 border-bottom">
        <h4 className="fw-bold text-primary m-0">
          InvestIQ
        </h4>

        <small className="text-muted">
          Smart Investing
        </small>
      </div>

      <div className="menus">

        <ul className="list-unstyled mt-3">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                style={{ textDecoration: "none" }}
              >
                <p
                  className={
                    location.pathname === item.path
                      ? "menu selected"
                      : "menu"
                  }
                >
                  <span style={{ marginRight: "10px" }}>
                    {item.icon}
                  </span>

                  {item.title}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <hr />

        {/* User Profile */}
        <div
          className="profile"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className="avatar">
              {initials}
            </div>

            <div style={{ marginLeft: "10px" }}>
              <p className="username m-0 fw-bold">
                {userName}
              </p>

              <small className="text-muted">
                {userEmail}
              </small>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="btn btn-danger btn-sm"
          >
            Logout
          </button>

        </div>

      </div>
    </div>
  );
};

export default Menu;