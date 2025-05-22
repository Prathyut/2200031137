import React from "react";

// Simple line chart using SVG (replace with Recharts/Chart.js for production)
function StockChart({ data, average }) {
  if (!data || data.length === 0) return <div>No data</div>;

  // SVG chart dimensions
  const width = 700, height = 320, padding = 40;
  const prices = data.map(d => d.price);
  const times = data.map(d => d.time);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  // Map data to SVG coordinates
  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
    const y = height - padding - ((d.price - minPrice) / (maxPrice - minPrice)) * (height - 2 * padding);
    return [x, y];
  });

  // Average line Y
  const avgY = height - padding - ((average - minPrice) / (maxPrice - minPrice)) * (height - 2 * padding);

  return (
    <svg width={width} height={height} style={{ background: "#f9f9f9", borderRadius: 12 }}>
      {/* Axes */}
      <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#bbb" />
      <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#bbb" />

      {/* Price line */}
      <polyline
        fill="none"
        stroke="#1976d2"
        strokeWidth="3"
        points={points.map(p => p.join(",")).join(" ")}
      />

      {/* Average line */}
      <line
        x1={padding}
        x2={width - padding}
        y1={avgY}
        y2={avgY}
        stroke="#ff9800"
        strokeDasharray="5 5"
        strokeWidth="2"
      />
      {/* Average label */}
      <text x={width - padding + 5} y={avgY + 5} fill="#ff9800" fontWeight="bold">
        Avg: {average.toFixed(2)}
      </text>

      {/* Price labels */}
      <text x={5} y={padding + 10} fill="#333">{maxPrice.toFixed(2)}</text>
      <text x={5} y={height - padding} fill="#333">{minPrice.toFixed(2)}</text>

      {/* Time labels */}
      <text x={padding} y={height - padding + 18} fill="#333">{times[0]}</text>
      <text x={width - padding - 30} y={height - padding + 18} fill="#333">{times[times.length - 1]}</text>
    </svg>
  );
}

export default StockChart;
