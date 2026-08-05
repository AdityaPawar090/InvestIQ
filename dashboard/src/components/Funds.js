import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import { usePortfolio } from "./PortfolioContext";

const Funds = () => {
  const { wallet, holdings, refresh } = usePortfolio();
  const generalContext = useContext(GeneralContext);

  const [showAdd, setShowAdd] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const usedMargin = holdings.reduce((sum, s) => sum + s.avg * s.qty, 0);

  const handleAdd = async () => {
    const value = Number(amount);
    if (!value || value <= 0) return;
    setSubmitting(true);
    try {
      await axios.post("http://localhost:3002/api/wallet/add", { amount: value }, { withCredentials: true });
      generalContext.showToast(`Added ₹${value.toLocaleString("en-IN")} to your wallet`, "success");
      setAmount("");
      setShowAdd(false);
      refresh();
    } catch (err) {
      generalContext.showToast(err.response?.data?.message || "Failed to add funds", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleWithdraw = async () => {
    const value = Number(amount);
    if (!value || value <= 0) return;
    setSubmitting(true);
    try {
      await axios.post("http://localhost:3002/api/wallet/withdraw", { amount: value }, { withCredentials: true });
      generalContext.showToast(`Withdrew ₹${value.toLocaleString("en-IN")} from your wallet`, "success");
      setAmount("");
      setShowWithdraw(false);
      refresh();
    } catch (err) {
      generalContext.showToast(err.response?.data?.message || "Failed to withdraw funds", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="funds">
        <p>Your virtual paper-trading wallet — practice with simulated money, zero real risk.</p>
        <button className="btn btn-green" onClick={() => { setShowAdd(true); setShowWithdraw(false); }}>
          Add funds
        </button>
        <button className="btn btn-blue ms-2" onClick={() => { setShowWithdraw(true); setShowAdd(false); }}>
          Withdraw
        </button>
      </div>

      {(showAdd || showWithdraw) && (
        <div className="card mt-3" style={{ maxWidth: 420 }}>
          <div className="card-body d-flex gap-2 align-items-end">
            <div className="flex-grow-1">
              <label className="form-label mb-1">Amount (₹)</label>
              <input
                type="number"
                className="form-control"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 5000"
                min="1"
              />
            </div>
            <button
              className={showAdd ? "btn btn-green" : "btn btn-blue"}
              disabled={submitting}
              onClick={showAdd ? handleAdd : handleWithdraw}
            >
              {submitting ? "…" : "Confirm"}
            </button>
            <button className="btn btn-grey" onClick={() => { setShowAdd(false); setShowWithdraw(false); }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="row mt-4">
        <div className="col">
          <span>
            <p>Equity</p>
          </span>

          <div className="table">
            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">₹{wallet !== null ? wallet.toFixed(2) : "…"}</p>
            </div>
            <div className="data">
              <p>Used margin (in holdings)</p>
              <p className="imp">₹{usedMargin.toFixed(2)}</p>
            </div>
            <div className="data">
              <p>Available cash</p>
              <p className="imp">₹{wallet !== null ? wallet.toFixed(2) : "…"}</p>
            </div>
            <hr />
            <div className="data">
              <p>Opening Balance (virtual)</p>
              <p>₹1,00,000.00</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="commodity">
            <p>This is a paper-trading wallet — no real money is ever involved.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funds;
