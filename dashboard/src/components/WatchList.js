import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Tooltip, Grow } from "@mui/material";
import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
  Star,
  StarBorder,
} from "@mui/icons-material";

import GeneralContext from "./GeneralContext";
import { usePortfolio } from "./PortfolioContext";
import { watchlist as defaultWatchlist } from "../data/data";
import { DoughnutChart } from "./DoughnoutChart";

const SYMBOLS = defaultWatchlist.map((s) => s.name);

// Deterministic color per stock, used for the little logo/avatar circle.
const stockColor = (name) => {
  const palette = ["#6366f1", "#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6"];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return palette[Math.abs(hash) % palette.length];
};

const WatchList = () => {
  const [quotes, setQuotes] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const { getHolding } = usePortfolio();

  const loadQuotes = () => {
    const symbolQuery = SYMBOLS.map((s) => `${s}.NS`).join(",");
    axios
      .get(`http://localhost:3002/api/stocks/batch?symbols=${symbolQuery}`)
      .then((res) => {
        const map = {};
        (res.data.quotes || []).forEach((q) => {
          const base = q.requestedSymbol.replace(".NS", "");
          map[base] = q;
        });
        setQuotes(map);
      })
      .catch(() => {});
  };

  const loadFavorites = () => {
    axios
      .get("http://localhost:3002/api/favorites", { withCredentials: true })
      .then((res) => setFavorites(res.data.favorites || []))
      .catch(() => {});
  };

  useEffect(() => {
    loadQuotes();
    loadFavorites();
    const interval = setInterval(loadQuotes, 20000);
    return () => clearInterval(interval);
  }, []);

  const toggleFavorite = async (symbol) => {
    if (favorites.includes(symbol)) {
      await axios.delete(`http://localhost:3002/api/favorites/${symbol}`, { withCredentials: true });
      setFavorites((f) => f.filter((s) => s !== symbol));
    } else {
      await axios.post("http://localhost:3002/api/favorites", { symbol }, { withCredentials: true });
      setFavorites((f) => [...f, symbol]);
    }
  };

  const visibleStocks = SYMBOLS.filter((name) => {
    if (showFavoritesOnly && !favorites.includes(name)) return false;
    if (search && !name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const chartData = {
    labels: visibleStocks,
    datasets: [
      {
        label: "Portfolio",
        data: visibleStocks.map((name) => quotes[name]?.price ?? 0),
        backgroundColor: visibleStocks.map((name) => stockColor(name)),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="watchlist-container">
      <div className="p-3 border-bottom">
        <h5 className="fw-bold mb-3">⭐ My Watchlist</h5>

        <input
          type="text"
          className="form-control"
          placeholder="Search stocks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="d-flex justify-content-between mt-2 align-items-center">
          <small className="text-muted">{visibleStocks.length} Stocks</small>

          <button className="btn btn-sm btn-outline-primary" onClick={() => setShowFavoritesOnly((v) => !v)}>
            {showFavoritesOnly ? "Show All" : "★ Favorites Only"}
          </button>
        </div>
      </div>

      <ul className="list">
        {visibleStocks.map((name) => (
          <WatchListItem
            key={name}
            name={name}
            quote={quotes[name]}
            isFavorite={favorites.includes(name)}
            onToggleFavorite={() => toggleFavorite(name)}
            owned={!!getHolding(name)}
          />
        ))}
      </ul>

      <div className="card shadow-sm border-0 m-3">
        <div className="card-body">
          <h6 className="fw-bold">Portfolio Distribution</h6>
          <DoughnutChart data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default WatchList;

function WatchListItem({ name, quote, isFavorite, onToggleFavorite, owned }) {
  const [showActions, setShowActions] = useState(false);

  const isDown = (quote?.changePercent ?? 0) < 0;
  const price = quote?.price;
  const changePercent = quote?.changePercent;

  return (
    <li
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      className="border-bottom"
    >
      <div className="item">
        <div className="d-flex align-items-center gap-2">
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: stockColor(name),
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 12,
              flexShrink: 0,
            }}
          >
            {name.slice(0, 2)}
          </div>

          <div>
            <p className={isDown ? "text-danger fw-bold mb-0" : "text-success fw-bold mb-0"}>
              {name} {owned && <span className="badge bg-primary ms-1" style={{ fontSize: 10 }}>Owned</span>}
            </p>
            <small className="text-muted">Watching</small>
          </div>
        </div>

        <div className="itemInfo">
          <span className="me-2">{changePercent !== undefined ? `${changePercent.toFixed(2)}%` : "—"}</span>
          {isDown ? <KeyboardArrowDown className="text-danger" /> : <KeyboardArrowUp className="text-success" />}
          <span className="fw-bold ms-2">{price !== undefined ? `₹${price.toFixed(2)}` : "…"}</span>
        </div>
      </div>

      {showActions && (
        <WatchListActions name={name} isFavorite={isFavorite} onToggleFavorite={onToggleFavorite} owned={owned} />
      )}
    </li>
  );
}

function WatchListActions({ name, isFavorite, onToggleFavorite, owned }) {
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => generalContext.openBuyWindow(name);

  const handleSellClick = () => {
    if (!owned) {
      generalContext.showToast(`You don't own any shares of ${name} yet.`, "error");
      return;
    }
    generalContext.openSellWindow(name);
  };

  return (
    <div className="actions">
      <Tooltip title="Buy" arrow TransitionComponent={Grow}>
        <button className="btn btn-success btn-sm" onClick={handleBuyClick}>
          Buy
        </button>
      </Tooltip>

      <Tooltip title={owned ? "Sell" : "You don't own this stock"} arrow TransitionComponent={Grow}>
        <button
          className={owned ? "btn btn-danger btn-sm ms-2" : "btn btn-outline-secondary btn-sm ms-2"}
          onClick={handleSellClick}
        >
          Sell
        </button>
      </Tooltip>

      <Tooltip title="AI Insight" arrow TransitionComponent={Grow}>
        <button className="btn btn-light btn-sm ms-2" onClick={() => generalContext.openInfoModal(name, "ai")}>
          <BarChartOutlined fontSize="small" />
        </button>
      </Tooltip>

      <Tooltip title={isFavorite ? "Remove Favorite" : "Add to Favorites"} arrow TransitionComponent={Grow}>
        <button className="btn btn-light btn-sm ms-2" onClick={onToggleFavorite}>
          {isFavorite ? <Star style={{ color: "#f59e0b" }} fontSize="small" /> : <StarBorder fontSize="small" />}
        </button>
      </Tooltip>

      <Tooltip title="More Details" arrow TransitionComponent={Grow}>
        <button className="btn btn-light btn-sm ms-2" onClick={() => generalContext.openInfoModal(name, "details")}>
          <MoreHoriz fontSize="small" />
        </button>
      </Tooltip>
    </div>
  );
}
