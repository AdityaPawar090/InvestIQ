import React, { useState, useContext, useRef, useEffect } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";

const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const generalContext = useContext(GeneralContext);

  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const initials = storedUser?.fullName
    ? storedUser.fullName.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase()
    : "U";

  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3002/api/auth/logout", {}, { withCredentials: true });
    } catch (err) {
      // ignore — clear local session regardless
    } finally {
      localStorage.removeItem("user");
      window.location.href = "http://localhost:3000";
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "This will permanently delete your account, holdings, orders, and alerts. This cannot be undone. Continue?"
    );
    if (!confirmed) return;

    try {
      await axios.delete("http://localhost:3002/api/auth/account", { withCredentials: true });
      localStorage.removeItem("user");
      generalContext.showToast("Account deleted.", "success");
      setTimeout(() => {
        window.location.href = "http://localhost:3000";
      }, 1200);
    } catch (err) {
      generalContext.showToast(err.response?.data?.message || "Failed to delete account", "error");
    }
  };

  return (
    <div className="position-relative" ref={ref}>
      <button className="avatar border-0" onClick={() => setOpen((o) => !o)} title={storedUser?.fullName || "Account"}>
        {initials}
      </button>

      {open && (
        <div className="iq-user-dropdown">
          <p className="fw-bold mb-0">{storedUser?.fullName || "User"}</p>
          <small className="text-muted">{storedUser?.email || ""}</small>
          <hr />
          <button className="btn btn-sm btn-primary w-100 mb-2" onClick={handleLogout}>
            Logout
          </button>
          <button className="btn btn-sm btn-outline-danger w-100" onClick={handleDeleteAccount}>
            Delete Account
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
