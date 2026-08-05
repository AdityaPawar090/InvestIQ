import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3002/allOrders", { withCredentials: true })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <h2>Order History</h2>
      </div>

      {loading && <p>Loading orders…</p>}

      {!loading && orders.length === 0 && (
        <p className="text-muted">
          No orders yet — buy a stock from your Watchlist to place your first order.
        </p>
      )}

      {orders.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Stock</th>
              <th>Type</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.name}</td>

                <td>
                  <span
                    style={{
                      color: "#fff",
                      background: order.mode === "BUY" ? "#22c55e" : "#ef4444",
                      padding: "4px 10px",
                      borderRadius: "5px",
                      fontSize: "13px",
                    }}
                  >
                    {order.mode}
                  </span>
                </td>

                <td>{order.qty}</td>
                <td>₹ {order.price}</td>
                <td>{order.createdAt ? new Date(order.createdAt).toLocaleString() : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
