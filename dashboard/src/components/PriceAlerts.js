import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";

const PriceAlerts = () => {
  const { showToast } = useContext(GeneralContext);
  const [alerts, setAlerts] = useState([]);
  const [form, setForm] = useState({ symbol: "", condition: "above", targetPrice: "" });
  const [loading, setLoading] = useState(false);

  const loadAlerts = () => {
    axios
      .get("http://localhost:3002/api/alerts", { withCredentials: true })
      .then((res) => setAlerts(res.data.alerts || []))
      .catch(() => {});
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  const createAlert = async (e) => {
    e.preventDefault();
    if (!form.symbol || !form.targetPrice) return;

    setLoading(true);
    try {
      await axios.post(
        "http://localhost:3002/api/alerts",
        { ...form, targetPrice: Number(form.targetPrice) },
        { withCredentials: true }
      );
      setForm({ symbol: "", condition: "above", targetPrice: "" });
      loadAlerts();
      showToast?.(`Alert set for ${form.symbol.toUpperCase()} 🔔`, "success");
    } catch (err) {
      showToast?.(err.response?.data?.message || "Unable to create alert", "error");
    } finally {
      setLoading(false);
    }
  };

  const deleteAlert = async (id) => {
    await axios.delete(`http://localhost:3002/api/alerts/${id}`, { withCredentials: true });
    loadAlerts();
  };

  return (
    <>
      <h3 className="title mb-4">🔔 Price Alerts</h3>

      <form
        onSubmit={createAlert}
        className="d-flex gap-2 flex-wrap"
        style={{ marginBottom: 24 }}
      >
        <input
          className="form-control"
          style={{ maxWidth: 160 }}
          placeholder="Symbol e.g. TCS.NS"
          value={form.symbol}
          onChange={(e) => setForm({ ...form, symbol: e.target.value })}
          required
        />
        <select
          className="form-select"
          style={{ maxWidth: 140 }}
          value={form.condition}
          onChange={(e) => setForm({ ...form, condition: e.target.value })}
        >
          <option value="above">Price goes above</option>
          <option value="below">Price goes below</option>
        </select>
        <input
          className="form-control"
          style={{ maxWidth: 140 }}
          type="number"
          step="0.01"
          placeholder="Target price"
          value={form.targetPrice}
          onChange={(e) => setForm({ ...form, targetPrice: e.target.value })}
          required
        />
        <button className="btn btn-blue" disabled={loading}>
          {loading ? "Adding…" : "Add Alert"}
        </button>
      </form>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Condition</th>
              <th>Target Price</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((a) => (
              <tr key={a._id}>
                <td>{a.symbol}</td>
                <td>{a.condition === "above" ? "≥" : "≤"}</td>
                <td>₹ {a.targetPrice}</td>
                <td>{a.triggered ? "✅ Triggered" : "⏳ Watching"}</td>
                <td>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => deleteAlert(a._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {alerts.length === 0 && <p style={{ marginTop: 16 }}>No alerts yet — add one above.</p>}
    </>
  );
};

export default PriceAlerts;
