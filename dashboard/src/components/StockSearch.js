import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";

const StockSearch = () => {
  const [symbol, setSymbol] = useState("");
  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(false);
  const generalContext = useContext(GeneralContext);

  const searchStock = async () => {
    if (!symbol.trim()) return;

    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:3002/api/stocks/${symbol.toUpperCase()}`
      );

      setStock(res.data);
    } catch (err) {
      generalContext.showToast("Stock not found — try a symbol like TCS.NS", "error");
      setStock(null);
    }

    setLoading(false);
  };

  return (
    <div className="card shadow-sm p-4">

      <h4>📈 Live Stock Search</h4>

      <div className="d-flex mt-3">

        <input
          className="form-control"
          placeholder="Example: TCS.NS"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />

        <button
          className="btn btn-primary ms-2"
          onClick={searchStock}
        >
          Search
        </button>

      </div>

      {loading && (
        <p className="mt-3">Loading...</p>
      )}

      {stock && stock.success && (

        <div className="mt-4">

          <h3>{stock.name}</h3>

          <h4>₹ {stock.price}</h4>

          <p>
            Change:
            {" "}
            {stock.change.toFixed(2)}
            {" ("}
            {stock.changePercent.toFixed(2)}
            %)
          </p>

          <hr />

          <p>Open : ₹ {stock.open}</p>

          <p>High : ₹ {stock.high}</p>

          <p>Low : ₹ {stock.low}</p>

          <p>Previous Close : ₹ {stock.previousClose}</p>

          <p>Volume : {stock.volume}</p>

          <p>Market Cap : {stock.marketCap}</p>

        </div>

      )}

    </div>
  );
};

export default StockSearch;