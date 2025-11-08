import React, { useMemo, useState } from "react";
import ReportFilters from "../components/reports/ReportFilters";
import ReportsTable from "../components/reports/ReportsTable";
import { exportReportCsv } from "../utils/exportCsv";

export default function ReportsPage() {
  // Filtros
  const [tipo, setTipo] = useState("");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");

  
  const [reports, setReports] = useState([
    { id: 1, fecha: "2024-04-12", tipo: "Finanzas", desde: "2024-04-01", hasta: "2024-04-30" },
    { id: 2, fecha: "2024-04-10", tipo: "Jugadores", desde: "", hasta: "" },
  ]);

  
  const nextId = useMemo(() => Math.max(0, ...reports.map(r => r.id)) + 1, [reports]);

  const handleGenerate = () => {
    
    if (!tipo) {
      alert("Selecciona el tipo de reporte.");
      return;
    }
    if ((desde && !hasta) || (!desde && hasta)) {
      alert("Selecciona el rango completo (Desde y Hasta) o déjalo vacío.");
      return;
    }
    const hoy = new Date();
    const nuevo = {
      id: nextId,
      fecha: hoy.toISOString().slice(0, 10),
      tipo,
      desde: desde || "",
      hasta: hasta || "",
    };
    setReports(prev => [nuevo, ...prev]);
    alert("Reporte generado ");
  };

  const handleDownload = (rep) => {
    
    const filasDemo = [
      ["Tipo", rep.tipo],
      ["Desde", rep.desde || "–"],
      ["Hasta", rep.hasta || "–"],
      ["Generado", rep.fecha],
    ];
    exportReportCsv(`reporte_${rep.tipo.toLowerCase()}_${rep.fecha}.csv`, filasDemo);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="m-0">Generar Reportes</h2>
      </div>

      {/* Filtros */}
      <div className="card mb-4">
        <div className="card-body">
          <ReportFilters
            tipo={tipo} setTipo={setTipo}
            desde={desde} setDesde={setDesde}
            hasta={hasta} setHasta={setHasta}
          />
        </div>
      </div>

      {/* Botón Generar */}
      <div className="d-flex justify-content-end mb-4">
        <button className="btn btn-primary" onClick={handleGenerate}>
          Generar reporte
        </button>
      </div>

      {/* Tabla de reportes */}
      <div className="card">
        <div className="card-body p-0">
          <ReportsTable rows={reports} onDownload={handleDownload} />
        </div>
      </div>
    </>
  );
}
