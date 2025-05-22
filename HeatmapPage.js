import React, { useEffect, useState } from "react";
import { fetchStocks, fetchStockHistory } from "../services/api";
import CorrelationHeatmap from "../components/CorrelationHeatmap";
import { pearson, mean, stddev } from "../utils/correlation";

const interval = 10; // Default interval for heatmap

function HeatmapPage() {
  const [stocks, setStocks] = useState([]);
  const [priceData, setPriceData] = useState({});
  const [matrix, setMatrix] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStocks().then(setStocks);
  }, []);

  useEffect(() => {
    if (stocks.length > 0) {
      setLoading(true);
      Promise.all(stocks.map(s => fetchStockHistory(s, interval)))
        .then(resArr => {
          const data = {};
          stocks.forEach((s, i) => { data[s] = resArr[i].map(d => d.price); });
          setPriceData(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [stocks]);

  useEffect(() => {
    if (stocks.length > 0 && Object.keys(priceData).length === stocks.length) {
      // Align by length
      const minLen = Math.min(...stocks.map(s => priceData[s].length));
      const aligned = stocks.map(s => priceData[s].slice(-minLen));
      // Build correlation matrix
      const mtx = stocks.map((s1, i) =>
        stocks.map((s2, j) =>
          i === j ? 1 : pearson(aligned[i], aligned[j])
        )
      );
      setMatrix(mtx);
    }
  }, [priceData, stocks]);

  function handleLabelHover(label) {
    if (!label || !priceData[label]) {
      setStats(null);
      return;
    }
    const arr = priceData[label];
    setStats({
      label,
      avg: mean(arr),
      std: stddev(arr),
    });
  }

  return (
    <div>
      <h2 style={{ color: "#1976d2" }}>Correlation Heatmap</h2>
      {loading && <div>Loading...</div>}
      {!loading && matrix.length > 0 && (
        <CorrelationHeatmap
          stocks={stocks}
          matrix={matrix}
          onLabelHover={handleLabelHover}
          stats={stats}
        />
      )}
    </div>
  );
}

export default HeatmapPage;
