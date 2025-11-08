import React, { useEffect, useRef } from "react";
import { Chart, LineElement, PointElement, LineController, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(LineElement, PointElement, LineController, CategoryScale, LinearScale, Tooltip, Legend, ChartDataLabels);

export default function IncomeChart() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Ene","Feb","Mar","Abr","May","Jun","Jul"],
        datasets: [{
          data: [5000,7000,8000,9000,10000,11000,12500],
          borderColor: "#dba41b",
          tension: 0.4,
          fill: false
        }]
      },
      options: {
        scales: { x: { display: false }, y: { display: false } },
        plugins: { legend: { display: false }, datalabels: { display: false } }
      }
    });
    return () => chart.destroy();
  }, []);
  return <canvas ref={canvasRef} style={{ width: "100%", height: 250 }} />;
}
