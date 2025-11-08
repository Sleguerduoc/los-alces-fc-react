import React, { useEffect, useRef } from "react";
import { Chart, BarElement, BarController, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(BarElement, BarController, CategoryScale, LinearScale, Tooltip, Legend, ChartDataLabels);

export default function ScorersChart() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["A. Pérez","J. Soto","R. Gutiérrez","M. López","D. Martínez"],
        datasets: [{ data: [12,10,8,6,4], backgroundColor: "#dba41b" }]
      },
      options: {
        indexAxis: "y",
        scales: { x: { beginAtZero: true } },
        plugins: {
          legend: { display: false },
          datalabels: {
            anchor: "end", align: "right",
            color: "var(--color-text)", font: { weight: "600" },
            formatter: (v) => v
          }
        }
      }
    });
    return () => chart.destroy();
  }, []);
  return <canvas ref={canvasRef} style={{ width: "100%", height: 250 }} />;
}
