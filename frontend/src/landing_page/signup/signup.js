import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../ToastContext";

function Signup() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:3002/api/auth/signup",
        user
      );

      showToast(res.data.message || "Account created! Please log in.", "success");

      setUser({
        fullName: "",
        email: "",
        password: "",
      });

      navigate("/login", { replace: true });
    } catch (err) {
      showToast(err.response?.data?.message || "Signup Failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "450px" }}>
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Create Account</h2>

        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter full name"
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name="email"
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
              placeholder="Enter password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          <p className="text-center mt-3 mb-0">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;