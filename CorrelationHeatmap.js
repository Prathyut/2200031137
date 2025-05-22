import React from "react";

function getColor(value) {
  // value: -1 to 1
  if (value > 0.8) return "#1976d2";
  if (value > 0.5) return "#64b5f6";
  if (value > 0.2) return "#bbdefb";
  if (value < -0.8) return "#d32f2f";
  if (value < -0.5) return "#e57373";
  if (value < -0.2) return "#ffcdd2";
  return "#e0e0e0";
}

function CorrelationHeatmap({ stocks, matrix, onLabelHover, stats }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ borderCollapse: "collapse", margin: "auto" }}>
        <thead>
          <tr>
            <th></th>
            {stocks.map((s, i) => (
              <th
                key={s}
                style={{
                  padding: 6,
                  cursor: "pointer",
                  fontWeight: 700,
                  background: "#f5f5f5"
                }}
                onMouseEnter={() => onLabelHover(s)}
                onMouseLeave={() => onLabelHover(null)}
              >
                {s}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {stocks.map((row, i) => (
            <tr key={row}>
              <th
                style={{
                  padding: 6,
                  cursor: "pointer",
                  fontWeight: 700,
                  background: "#f5f5f5"
                }}
                onMouseEnter={() => onLabelHover(row)}
                onMouseLeave={() => onLabelHover(null)}
              >
                {row}
              </th>
              {stocks.map((col, j) => (
                <td
                  key={col}
                  style={{
                    width: 36,
                    height: 36,
                    background: getColor(matrix[i][j]),
                    textAlign: "center",
                    border: "1px solid #ccc",
                    fontWeight: i === j ? "bold" : "normal"
                  }}
                  title={matrix[i][j].toFixed(2)}
                >
                  {i === j ? "—" : matrix[i][j].toFixed(2)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ margin: "18px 0" }}>
        <span style={{ background: "#1976d2", color: "#fff", padding: "2px 8px", borderRadius: 4 }}>Strong Positive</span>
        <span style={{ background: "#e0e0e0", margin: "0 8px", padding: "2px 8px", borderRadius: 4 }}>Neutral</span>
        <span style={{ background: "#d32f2f", color: "#fff", padding: "2px 8px", borderRadius: 4 }}>Strong Negative</span>
      </div>
      {stats && (
        <div style={{ marginTop: 10 }}>
          <strong>{stats.label}</strong>: Average = {stats.avg.toFixed(2)}, Std Dev = {stats.std.toFixed(2)}
        </div>
      )}
    </div>
  );
}

export default CorrelationHeatmap;
