import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import axios from "axios";

const PortfolioContext = createContext(null);

export const PortfolioProvider = ({ children }) => {
  const [holdings, setHoldings] = useState([]);
  const [wallet, setWallet] = useState(null);
  const [livePrices, setLivePrices] = useState({});
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const [holdingsRes, walletRes] = await Promise.all([
        axios.get("http://localhost:3002/allHoldings", { withCredentials: true }),
        axios.get("http://localhost:3002/api/wallet", { withCredentials: true }),
      ]);

      setHoldings(holdingsRes.data);
      setWallet(walletRes.data.balance);

      const prices = {};
      await Promise.all(
        holdingsRes.data.map(async (h) => {
          try {
            const r = await axios.get(`http://localhost:3002/api/stocks/${h.name}.NS`);
            prices[h.name] = r.data;
          } catch {
            /* live price unavailable — components fall back to stored price */
          }
        })
      );
      setLivePrices(prices);
    } catch (err) {
      console.error("Portfolio refresh failed:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 25000); // keep prices live
    return () => clearInterval(interval);
  }, [refresh]);

  const getHolding = useCallback(
    (name) => holdings.find((h) => h.name === name),
    [holdings]
  );

  return (
    <PortfolioContext.Provider value={{ holdings, wallet, livePrices, loading, refresh, getHolding }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
