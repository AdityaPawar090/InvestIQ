import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../navbar.css";
import Logo from "../Logo";
import { useTheme } from "../ThemeContext";

function NavBar() {
  const { dark, toggleTheme } = useTheme();
  const [authUser, setAuthUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3002/api/auth/me", { withCredentials: true })
      .then((res) => setAuthUser(res.data.user || res.data))
      .catch(() => setAuthUser(null))
      .finally(() => setChecking(false));
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3002/api/auth/logout", {}, { withCredentials: true });
    } catch (err) {
      // even if the request fails, clear the local session so the UI doesn't get stuck
    } finally {
      localStorage.removeItem("user");
      setAuthUser(null);
      navigate("/", { replace: true });
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand fw-bold fs-3 d-flex align-items-center gap-2 iq-brand-text" to="/">
          <Logo size={34} />
          InvestIQ
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav ms-auto align-items-lg-center">

            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/products">
                Features
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/pricing">
                Pricing
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/support">
                Contact
              </NavLink>
            </li>

            <li className="nav-item ms-lg-2 mt-3 mt-lg-0">
              <button className="btn btn-light border" onClick={toggleTheme} title="Toggle dark mode">
                {dark ? "☀️" : "🌙"}
              </button>
            </li>

            {!checking && (
              authUser ? (
                <>
                  <li className="nav-item ms-lg-3 mt-3 mt-lg-0">
                    <Link
                      to="http://localhost:3000"
                      onClick={(e) => { e.preventDefault(); window.location.href = "http://localhost:3000"; }}
                      className="btn btn-outline-primary rounded-pill px-4"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item ms-lg-2 mt-3 mt-lg-0">
                    <button
                      className="btn btn-primary rounded-pill px-4"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item ms-lg-3 mt-3 mt-lg-0">
                    <Link className="nav-link fw-semibold" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item ms-lg-2 mt-3 mt-lg-0">
                    <Link
                      to="/signup"
                      className="btn btn-primary rounded-pill px-4"
                    >
                      Get Started
                    </Link>
                  </li>
                </>
              )
            )}

          </ul>

        </div>

      </div>
    </nav>
  );
}

export default NavBar;