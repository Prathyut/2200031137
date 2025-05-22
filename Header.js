import React from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "#1976d2",
      color: "#fff",
      padding: "18px 32px"
    }}>
      <div style={{ fontWeight: 700, fontSize: 20 }}>Stock Aggregation App</div>
      <div>
        <Link
          to="/"
          style={{
            color: "#fff",
            marginLeft: 16,
            textDecoration: location.pathname === "/" ? "underline" : "none",
            fontWeight: "bold"
          }}
        >
          Stock Chart
        </Link>
        <Link
          to="/heatmap"
          style={{
            color: "#fff",
            marginLeft: 16,
            textDecoration: location.pathname === "/heatmap" ? "underline" : "none",
            fontWeight: "bold"
          }}
        >
          Correlation Heatmap
        </Link>
      </div>
    </div>
  );
}

export default Header;
