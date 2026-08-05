import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";

import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import { ThemeProvider } from "./ThemeContext";
import { PortfolioProvider } from "./components/PortfolioContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <PortfolioProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </PortfolioProvider>
    </ThemeProvider>
  </React.StrictMode>
);