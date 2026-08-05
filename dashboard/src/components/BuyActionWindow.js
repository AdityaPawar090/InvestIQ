import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import { usePortfolio } from "./PortfolioContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [qty, setQty] = useState(1);
  const [livePrice, setLivePrice] = useState(null);
  const [loadingPrice, setLoadingPrice] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const generalContext = useContext(GeneralContext);
  const { wallet, refresh } = usePortfolio();

  useEffect(() => {
    axios
      .get(`http://localhost:3002/api/stocks/${uid}.NS`)
      .then((res) => setLivePrice(res.data.price))
      .catch(() => setLivePrice(null))
      .finally(() => setLoadingPrice(false));
  }, [uid]);

  const total = livePrice ? livePrice * qty : 0;
  const insufficient = wallet !== null && total > wallet;

  const handleBuyClick = async () => {
    if (!livePrice || qty <= 0) return;
    setSubmitting(true);

    try {
      await axios.post(
        "http://localhost:3002/newOrder",
        { name: uid, qty, mode: "BUY" },
        { withCredentials: true }
      );

      generalContext.showToast(`Bought ${qty} ${uid} @ ₹${livePrice.toFixed(2)}`, "success");
      refresh();
      generalContext.closeBuyWindow();
    } catch (err) {
      generalContext.showToast(err.response?.data?.message || "Failed to place order", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelClick = () => generalContext.closeBuyWindow();

  return (
    <div className="bw-overlay" onClick={handleCancelClick}>
      <div className="bw-container" onClick={(e) => e.stopPropagation()}>
        <div className="bw-header">
          <h3>
            Buy {uid} <span>NSE</span>
          </h3>
        </div>

        <div className="bw-regular-order">
          <div className="bw-inputs">
            <fieldset>
              <legend>Qty.</legend>
              <input
                type="number"
                min="1"
                value={qty}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
              />
            </fieldset>

            <fieldset>
              <legend>Live Price</legend>
              <input
                type="text"
                value={loadingPrice ? "…" : livePrice ? `₹${livePrice.toFixed(2)}` : "N/A"}
                disabled
              />
            </fieldset>
          </div>
        </div>

        <div className="bw-buttons">
          <div className="d-flex flex-column">
            <span>Total: ₹{total.toFixed(2)}</span>
            <span className={insufficient ? "text-danger fw-bold" : ""}>
              Wallet: ₹{wallet !== null ? wallet.toFixed(2) : "…"}
              {insufficient && " — Insufficient balance"}
            </span>
          </div>

          <div>
            <button
              className="bw-btn bw-btn-blue"
              onClick={handleBuyClick}
              disabled={submitting || loadingPrice || insufficient || !livePrice}
            >
              {submitting ? "Placing…" : "Buy"}
            </button>

            <button className="bw-btn bw-btn-grey" onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
