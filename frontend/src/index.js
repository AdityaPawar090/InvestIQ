import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import { ThemeProvider } from "./ThemeContext";
import { ToastProvider } from "./ToastContext";

import HomePage from "./landing_page/home/HomePage";
import Signup from "./landing_page/signup/signup";
import Login from "./landing_page/login/login";

import AboutPage from "./landing_page/about/AboutPage";
import ProductPage from "./landing_page/products/ProductPage";
import PricingPage from "./landing_page/pricing/PricingPage";
import SupportPage from "./landing_page/support/SupportPage";

import NotFound from "./landing_page/NotFound";
import NavBar from "./landing_page/NavBar";
import Footer from "./landing_page/Footer";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThemeProvider>
    <ToastProvider>
      <BrowserRouter>
        <NavBar />

        <Routes>
          {/* Home */}
          <Route path="/" element={<HomePage />} />

          {/* Authentication */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Pages */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/support" element={<SupportPage />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </ToastProvider>
  </ThemeProvider>
);