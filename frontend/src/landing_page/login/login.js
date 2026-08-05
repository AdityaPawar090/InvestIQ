import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../ToastContext";

function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  // If already logged in, don't show the login form at all — send them home.
  useEffect(() => {
    axios
      .get("http://localhost:3002/api/auth/me", { withCredentials: true })
      .then(() => navigate("/", { replace: true }))
      .catch(() => {});
  }, [navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:3002/api/auth/login",
        user,
        { withCredentials: true }
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));
      showToast("Login successful! Welcome back.", "success");

      // Stay on the landing app — replace (not push) so the browser's back
      // button never lands back on this login form.
      navigate("/", { replace: true });
    } catch (err) {
      showToast(err.response?.data?.message || "Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "450px" }}>
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Login</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Enter password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center mt-3 mb-0">
            New to InvestIQ? <a href="/signup">Create an account</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
