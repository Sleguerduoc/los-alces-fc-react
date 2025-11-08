import React, { useMemo, useRef } from "react";
import IncomeExpenseChart from "./IncomeExpenseChart";

export default function FinancePanel({ items = [], rango, setRango, labelRango, serie }) {
  const fileRef = useRef(null);

  const rows = useMemo(() => {
    
    return [...items].sort((a, b) => (a.fecha < b.fecha ? 1 : -1));
  }, [items]);

  const handleAttach = () => fileRef.current?.click();
  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (f) alert(`Comprobante "${f.name}" adjuntado ✅`);
    e.target.value = null;
  };

  const exportCSV = () => {
    const header = "Fecha,Descripción,Monto\n";
    const body = rows.map(r => `${r.fecha},${r.desc},${r.monto}`).join("\n");
    const blob = new Blob([header + body], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "finanzas.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title mb-0">Finanzas</h5>
      </div>
      <div className="card-body">
        {}
        <div className="mb-3">
          <select className="form-select" value={rango} onChange={(e)=>setRango(e.target.value)}>
            <option value="2024-04">{labelRango}</option>
            <option value="2024-05">01/05/2024 – 31/05/2024</option>
          </select>
        </div>

        {}
        <div className="table-responsive mb-3">
          <table className="table align-middle mb-0">
            <thead>
              <tr><th>Fecha</th><th>Descripción</th><th>Monto</th></tr>
            </thead>
            <tbody>
              {rows.map((r, idx) => (
                <tr key={idx}>
                  <td>{new Date(r.fecha).toLocaleDateString("es-CL")}</td>
                  <td>{r.desc}</td>
                  <td>
                    {r.monto >= 0 ? (
                      <span className="text-success">+ CLP {r.monto.toLocaleString("es-CL")}</span>
                    ) : (
                      <span className="text-danger">– CLP {Math.abs(r.monto).toLocaleString("es-CL")}</span>
                    )}
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan="3" className="text-center text-muted">Sin movimientos</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {}
        <div className="mb-3">
          <IncomeExpenseChart data={serie} />
        </div>

        {}
        <div>
          <input ref={fileRef} type="file" hidden onChange={onFile} />
          <button className="btn btn-secondary me-2" onClick={handleAttach}>
            Adjuntar comprobante
          </button>
          <button className="btn btn-primary" onClick={exportCSV}>
            Generar reporte
          </button>
        </div>
      </div>
    </div>
  );
}
