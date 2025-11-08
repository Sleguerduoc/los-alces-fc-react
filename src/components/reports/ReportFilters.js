import React from "react";

export default function ReportFilters({ tipo, setTipo, desde, setDesde, hasta, setHasta }) {
  return (
    <div className="row g-3">
      <div className="col-12 col-md-4">
        <select className="form-select" value={tipo} onChange={(e)=>setTipo(e.target.value)}>
          <option value="" disabled>Tipo de reporte</option>
          <option>Finanzas</option>
          <option>Jugadores</option>
          <option>Socios</option>
          <option>Equipo técnico</option>
          <option>Partidos</option>
        </select>
      </div>
      <div className="col-6 col-md-4">
        <input type="date" className="form-control" placeholder="Desde" value={desde} onChange={(e)=>setDesde(e.target.value)} />
      </div>
      <div className="col-6 col-md-4">
        <input type="date" className="form-control" placeholder="Hasta" value={hasta} onChange={(e)=>setHasta(e.target.value)} />
      </div>
    </div>
  );
}
