import React, { useEffect, useState } from "react";
import { fetchStocks, fetchStockHistory } from "../services/api";
import StockChart from "../components/StockChart";
import { mean } from "../utils/correlation";

const intervals = [5, 10, 15];

function StockChartPage() {
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState("");
  const [interval, setInterval] = useState(intervals[0]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStocks().then(setStocks);
  }, []);

  useEffect(() => {
    if (selectedStock) {
      setLoading(true);
      fetchStockHistory(selectedStock, interval)
        .then((res) => {
          setData(res);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [selectedStock, interval]);

  const avg = data.length > 0 ? mean(data.map(d => d.price)) : 0;

  return (
    <div>
      <h2 style={{ color: "#1976d2" }}>Stock Chart</h2>
      <div style={{ marginBottom: 20 }}>
        <label>
          <span style={{ fontWeight: 600 }}>Stock:&nbsp;</span>
          <select value={selectedStock} onChange={e => setSelectedStock(e.target.value)} style={{ marginRight: 20 }}>
            <option value="">Select</option>
            {stocks.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
        <label>
          <span style={{ fontWeight: 600 }}>Interval:&nbsp;</span>
          <select value={interval} onChange={e => setInterval(Number(e.target.value))}>
            {intervals.map(i => (
              <option key={i} value={i}>{i} min</option>
            ))}
          </select>
        </label>
      </div>
      {loading && <div>Loading...</div>}
      {!loading && data.length > 0 && <StockChart data={data} average={avg} />}
    </div>
  );
}

export default StockChartPage;
