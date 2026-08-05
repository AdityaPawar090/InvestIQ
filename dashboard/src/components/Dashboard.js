import React from "react";
import { Routes, Route } from "react-router-dom";

import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";
import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import News from "./News";
import PriceAlerts from "./PriceAlerts";
import TopBar from "./TopBar";
import { GeneralContextProvider } from "./GeneralContext";
import { PortfolioProvider } from "./PortfolioContext";

const Dashboard = () => {
  return (
    <GeneralContextProvider>
      <PortfolioProvider>
        <TopBar />

        <div className="dashboard-container">
          {/* Left Sidebar */}
          <aside className="watchlist-section">
            <WatchList />
          </aside>

          {/* Main Content */}
          <main className="content">
            <Routes>
              <Route path="/" element={<Summary />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/holdings" element={<Holdings />} />
              <Route path="/positions" element={<Positions />} />
              <Route path="/funds" element={<Funds />} />
              <Route path="/apps" element={<Apps />} />
              <Route path="/news" element={<News />} />
              <Route path="/alerts" element={<PriceAlerts />} />
            </Routes>
          </main>
        </div>
      </PortfolioProvider>
    </GeneralContextProvider>
  );
};

export default Dashboard;
