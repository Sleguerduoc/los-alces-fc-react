import React, { useEffect, useRef } from "react";
import { Chart, LineElement, PointElement, LineController, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

Chart.register(LineElement, PointElement, LineController, CategoryScale, LinearScale, Tooltip, Legend);

export default function PointsLineChart({ data = [] }) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = ref.current.getContext("2d");
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map((_, i) => i + 1),
        datasets: [{
          data,
          borderColor: "#dba41b",
          tension: 0.4,
          fill: false
        }]
      },
      options: {
        scales: { x: { display: false }, y: { display: false } },
        plugins: { legend: { display: false } }
      }
    });
    return () => chart.destroy();
  }, [data]);

  return <canvas ref={ref} style={{ width: "100%", height: 220 }} />;
}
