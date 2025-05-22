import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import StockChartPage from "./pages/StockChartPage";
import HeatmapPage from "./pages/HeatmapPage";

function App() {
  return (
    <Router>
      <Header />
      <div style={{
        maxWidth: 900,
        margin: "40px auto",
        background: "#fff",
        padding: 32,
        borderRadius: 12,
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)"
      }}>
        <Routes>
          <Route path="/" element={<StockChartPage />} />
          <Route path="/heatmap" element={<HeatmapPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
