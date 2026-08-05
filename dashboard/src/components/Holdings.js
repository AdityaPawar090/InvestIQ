import React, { useContext } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { VerticalGraph } from "./VerticalGraph";
import AIPortfolioInsights from "./AIPortfolioInsights";
import AIStockAnalyzer from "./AIStockAnalyzer";
import GeneralContext from "./GeneralContext";
import { usePortfolio } from "./PortfolioContext";

const Holdings = () => {
  const { holdings: allHoldings, livePrices, loading } = usePortfolio();
  const generalContext = useContext(GeneralContext);

  const labels = allHoldings.map((stock) => stock.name);

  const data = {
    labels,
    datasets: [
      {
        label: "Live Stock Price",
        data: allHoldings.map((stock) => livePrices[stock.name]?.price || stock.price),
        backgroundColor: "#3b82f6",
      },
    ],
  };

  const totalInvestment = allHoldings.reduce((acc, stock) => acc + stock.avg * stock.qty, 0);

  const currentValue = allHoldings.reduce((acc, stock) => {
    const livePrice = livePrices[stock.name]?.price || stock.price;
    return acc + livePrice * stock.qty;
  }, 0);

  const profitLoss = currentValue - totalInvestment;

  const profitPercent = totalInvestment > 0 ? ((profitLoss / totalInvestment) * 100).toFixed(2) : 0;

  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("InvestIQ - Portfolio Holdings Report", 14, 18);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 25);

    autoTable(doc, {
      startY: 32,
      head: [["Stock", "Qty", "Avg Price", "Current Price", "Current Value", "P/L"]],
      body: allHoldings.map((stock) => {
        const livePrice = livePrices[stock.name]?.price || stock.price;
        const current = livePrice * stock.qty;
        const pnl = current - stock.avg * stock.qty;
        return [
          stock.name,
          stock.qty,
          `Rs ${stock.avg.toFixed(2)}`,
          `Rs ${livePrice.toFixed(2)}`,
          `Rs ${current.toFixed(2)}`,
          `Rs ${pnl.toFixed(2)}`,
        ];
      }),
    });

    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.text(`Total Investment: Rs ${totalInvestment.toFixed(2)}`, 14, finalY);
    doc.text(`Current Value: Rs ${currentValue.toFixed(2)}`, 14, finalY + 7);
    doc.text(`Overall P/L: Rs ${profitLoss.toFixed(2)} (${profitPercent}%)`, 14, finalY + 14);

    doc.save(`InvestIQ-Portfolio-${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
        <h3 className="title">Portfolio Holdings</h3>
        <button className="btn btn-blue" onClick={exportToPDF} disabled={allHoldings.length === 0}>
          📄 Export Report
        </button>
      </div>

      {loading && <p>Loading holdings…</p>}
      {!loading && allHoldings.length === 0 && (
        <p className="text-muted">No holdings yet — buy a stock from your Watchlist to get started.</p>
      )}

      {allHoldings.length > 0 && (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Stock</th>
                <th>Qty</th>
                <th>Avg Price</th>
                <th>Current Price</th>
                <th>Current Value</th>
                <th>P/L</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {allHoldings.map((stock, index) => {
                const livePrice = livePrices[stock.name]?.price || stock.price;
                const current = livePrice * stock.qty;
                const pnl = current - stock.avg * stock.qty;

                return (
                  <tr key={index}>
                    <td>{stock.name}</td>
                    <td>{stock.qty}</td>
                    <td>₹ {stock.avg.toFixed(2)}</td>
                    <td>
                      ₹ {livePrice.toFixed(2)}
                      <br />
                      {livePrices[stock.name] && (
                        <small
                          style={{
                            color: livePrices[stock.name].change >= 0 ? "green" : "red",
                            fontWeight: "bold",
                          }}
                        >
                          {livePrices[stock.name].change.toFixed(2)} ({livePrices[stock.name].changePercent.toFixed(2)}%)
                        </small>
                      )}
                    </td>
                    <td>₹ {current.toFixed(2)}</td>
                    <td className={pnl >= 0 ? "profit" : "loss"}>₹ {pnl.toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => generalContext.openSellWindow(stock.name)}
                      >
                        Sell
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="row">
        <div className="col">
          <h5>₹ {totalInvestment.toFixed(2)}</h5>
          <p>Total Investment</p>
        </div>

        <div className="col">
          <h5>₹ {currentValue.toFixed(2)}</h5>
          <p>Current Value</p>
        </div>

        <div className="col">
          <h5 className={profitLoss >= 0 ? "profit" : "loss"}>₹ {profitLoss.toFixed(2)}</h5>
          <p>{profitPercent}% Overall Return</p>
        </div>
      </div>

      <div style={{ marginTop: "40px" }}>
        {allHoldings.length > 0 && <VerticalGraph data={data} />}
        <AIPortfolioInsights />
        <AIStockAnalyzer />
      </div>
    </>
  );
};

export default Holdings;
