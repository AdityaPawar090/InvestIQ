import React from "react";
import Hero from "./Hero";
import Awards from "./Awards";
import Stats from "./Stats";
import Pricing from "./Pricing";
import Education from "./Education";
import OpenAccount from "../OpenAccount";

function HomePage() {
  return (
    <main>

      {/* Hero Section */}
      <Hero />

      {/* Why Choose InvestIQ */}
      <Awards />

      {/* Platform Statistics */}
      <Stats />

      {/* Features & Pricing */}
      <Pricing />

      {/* Learn & Grow */}
      <Education />

      {/* Call To Action */}
      <OpenAccount />

    </main>
  );
}

export default HomePage;