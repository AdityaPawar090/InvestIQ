import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import { usePortfolio } from "./PortfolioContext";
import "./BuyActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const generalContext = useContext(GeneralContext);
  const { getHolding, livePrices, refresh } = usePortfolio();

  const holding = getHolding(uid);
  const maxQty = holding?.qty || 0;
  const livePrice = livePrices[uid]?.price || holding?.price || 0;

  const [qty, setQty] = useState(Math.min(1, maxQty) || 1);
  const [submitting, setSubmitting] = useState(false);

  const total = livePrice * qty;
  const overQty = qty > maxQty;

  const handleSellClick = async () => {
    if (qty <= 0 || overQty) return;
    setSubmitting(true);

    try {
      await axios.post(
        "http://localhost:3002/newOrder",
        { name: uid, qty, mode: "SELL" },
        { withCredentials: true }
      );

      generalContext.showToast(`Sold ${qty} ${uid} @ ₹${livePrice.toFixed(2)}`, "success");
      refresh();
      generalContext.closeSellWindow();
    } catch (err) {
      generalContext.showToast(err.response?.data?.message || "Failed to place order", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelClick = () => generalContext.closeSellWindow();

  return (
    <div className="bw-overlay" onClick={handleCancelClick}>
      <div className="bw-container" onClick={(e) => e.stopPropagation()}>
        <div className="bw-header" style={{ background: "linear-gradient(135deg, #f87171, #dc2626)" }}>
          <h3>
            Sell {uid} <span>NSE</span>
          </h3>
        </div>

        <div className="bw-regular-order">
          {maxQty === 0 ? (
            <p className="text-danger">You don't own any shares of {uid}.</p>
          ) : (
            <div className="bw-inputs">
              <fieldset>
                <legend>Qty. (max {maxQty})</legend>
                <input
                  type="number"
                  min="1"
                  max={maxQty}
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                />
              </fieldset>

              <fieldset>
                <legend>Live Price</legend>
                <input type="text" value={`₹${livePrice.toFixed(2)}`} disabled />
              </fieldset>
            </div>
          )}
        </div>

        {maxQty > 0 && (
          <div className="bw-buttons">
            <div className="d-flex flex-column">
              <span>You'll receive: ₹{total.toFixed(2)}</span>
              {overQty && <span className="text-danger fw-bold">You only own {maxQty} shares</span>}
            </div>

            <div>
              <button
                className="bw-btn bw-btn-red"
                onClick={handleSellClick}
                disabled={submitting || overQty || qty <= 0}
              >
                {submitting ? "Placing…" : "Sell"}
              </button>

              <button className="bw-btn bw-btn-grey" onClick={handleCancelClick}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {maxQty === 0 && (
          <div className="bw-buttons">
            <span></span>
            <button className="bw-btn bw-btn-grey" onClick={handleCancelClick}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellActionWindow;
