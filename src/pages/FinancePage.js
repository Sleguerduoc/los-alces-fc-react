import React, { useMemo, useState } from "react";
import TransferForm from "../components/finance/TransferForm";
import FinancePanel from "../components/finance/FinancePanel";

export default function FinancePage() {
  const [items, setItems] = useState([
    { fecha: "2024-04-01", desc: "Cuota social",        monto: 100000 },   // ingreso +
    { fecha: "2024-04-03", desc: "Sueldos jugadores",   monto: -250000 },  // egreso -
    { fecha: "2024-04-10", desc: "Venta de entradas",   monto: 300000 },
  ]);

  const addItem = (it) => setItems((prev) => [it, ...prev]);

  const [rango, setRango] = useState("2024-04");

  
  const labelRango = useMemo(
    () =>
      rango === "2024-05"
        ? "01/05/2024 – 31/05/2024"
        : "01/04/2024 – 30/04/2024",
    [rango]
  );


  const serieChart = useMemo(() => {
    const [yr, mo] = rango.split("-").map(Number);
    const monthIdx = mo - 1;
    const series = [0,0,0,0,0];
    items.forEach((it) => {
      const d = new Date(it.fecha);
      if (d.getFullYear() === yr && d.getMonth() === monthIdx) {
        const w = Math.min(4, Math.floor((d.getDate() - 1) / 7));
        series[w] += it.monto;
      }
  });
  return series;
}, [items, rango]);

  return (
    <>
      <div className="row g-3">
        <div className="col-12 col-lg-4">
          <TransferForm onCreate={(mov) => addItem(mov)} />
        </div>

        <div className="col-12 col-lg-8">
          <FinancePanel
            items={items}
            rango={rango}
            setRango={setRango}
            labelRango={labelRango}
            serie={serieChart}
          />
        </div>
      </div>
    </>
  );
}
