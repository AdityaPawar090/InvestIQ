import React from "react";
import { usePortfolio } from "./PortfolioContext";

// This app doesn't distinguish intraday vs delivery trades, so Positions
// mirrors your real Holdings — it's the same live data, not a separate
// (and previously always-empty) collection.
const Positions = () => {
  const { holdings, livePrices, loading } = usePortfolio();

  const totalInvestment = holdings.reduce((sum, s) => sum + s.avg * s.qty, 0);
  const currentValue = holdings.reduce((sum, s) => {
    const live = livePrices[s.name]?.price || s.price;
    return sum + live * s.qty;
  }, 0);
  const totalPnL = currentValue - totalInvestment;

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">📈 Open Positions</h2>
          <p className="text-muted">Monitor all your active investments.</p>
        </div>
        <span className="badge bg-primary fs-6">{holdings.length} Positions</span>
      </div>

      {loading && <p>Loading positions…</p>}

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Investment</h6>
              <h4>₹ {totalInvestment.toFixed(2)}</h4>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Current Value</h6>
              <h4>₹ {currentValue.toFixed(2)}</h4>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Overall P&L</h6>
              <h4 className={totalPnL >= 0 ? "text-success" : "text-danger"}>₹ {totalPnL.toFixed(2)}</h4>
            </div>
          </div>
        </div>
      </div>

      {!loading && holdings.length === 0 && (
        <p className="text-muted">No open positions yet — buy a stock from your Watchlist.</p>
      )}

      {holdings.length > 0 && (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Product</th>
                <th>Stock</th>
                <th>Quantity</th>
                <th>Average Price</th>
                <th>Current Price</th>
                <th>P&L</th>
                <th>Day Change</th>
              </tr>
            </thead>

            <tbody>
              {holdings.map((stock, index) => {
                const livePrice = livePrices[stock.name]?.price || stock.price;
                const pnl = livePrice * stock.qty - stock.avg * stock.qty;
                const dayChangePercent = livePrices[stock.name]?.changePercent;

                return (
                  <tr key={index}>
                    <td>CNC</td>
                    <td className="fw-semibold">{stock.name}</td>
                    <td>{stock.qty}</td>
                    <td>₹ {stock.avg.toFixed(2)}</td>
                    <td>₹ {livePrice.toFixed(2)}</td>
                    <td className={pnl >= 0 ? "text-success fw-bold" : "text-danger fw-bold"}>₹ {pnl.toFixed(2)}</td>
                    <td className={dayChangePercent >= 0 ? "text-success" : "text-danger"}>
                      {dayChangePercent !== undefined ? `${dayChangePercent.toFixed(2)}%` : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Positions;
