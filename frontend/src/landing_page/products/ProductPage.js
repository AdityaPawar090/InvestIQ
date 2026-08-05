import React from "react";
import Hero from "./Hero";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import Universe from "./Universe";

function ProductPage() {
  return (
    <main>

      <Hero />

      <LeftSection
        imageURL="media/images/kite.png"
        productName="AI Portfolio Advisor"
        productDescription="Analyze your investment portfolio using AI. Get personalized recommendations, identify portfolio risks, and receive suggestions to improve diversification."
        tryDemo=""
        learnMore=""
        googlePlay=""
        appStore=""
      />

      <RightSection
        imageURL="media/images/console.png"
        productName="Portfolio Dashboard"
        productDescription="Monitor holdings, positions, orders, and overall portfolio performance through a clean, responsive dashboard with insightful visualizations."
        learnMore=""
      />

      <LeftSection
        imageURL="media/images/coin.png"
        productName="Smart Watchlist"
        productDescription="Create multiple watchlists, bookmark favorite stocks, add personal notes, and receive intelligent price alerts."
        tryDemo=""
        learnMore=""
        googlePlay=""
        appStore=""
      />

      <RightSection
        imageURL="media/images/kiteconnect.png"
        productName="Finance AI Chatbot"
        productDescription="Ask questions about investing, stock markets, financial concepts, and portfolio management using an AI-powered chatbot."
        learnMore=""
      />

      <LeftSection
        imageURL="media/images/varsity.png"
        productName="Learning Hub"
        productDescription="Learn investing through beginner-friendly articles, market basics, investment strategies, and interactive educational resources."
        tryDemo=""
        learnMore=""
        googlePlay=""
        appStore=""
      />

      <section className="container text-center py-5">
        <h2 className="fw-bold mb-3">
          Built with Modern Technologies
        </h2>

        <p className="text-muted fs-5">
          InvestIQ is powered by the MERN stack and is designed to integrate
          AI services, secure authentication, interactive dashboards, and
          scalable cloud deployment.
        </p>
      </section>

      <Universe />

    </main>
  );
}

export default ProductPage;