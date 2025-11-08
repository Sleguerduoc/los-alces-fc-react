import React from "react";

export default function StatsFilters({ division, setDivision, condicion, setCondicion, anio, setAnio }) {
  return (
    <div className="row g-3">
      <div className="col-12 col-md-4">
        <select className="form-select" value={division} onChange={(e)=>setDivision(e.target.value)}>
          <option value="" disabled>División</option>
          <option>Primera</option>
          <option>Segunda</option>
        </select>
      </div>
      <div className="col-12 col-md-4">
        <select className="form-select" value={condicion} onChange={(e)=>setCondicion(e.target.value)}>
          <option value="" disabled>Local/Visitante</option>
          <option>Local</option>
          <option>Visitante</option>
        </select>
      </div>
      <div className="col-12 col-md-4">
        <select className="form-select" value={anio} onChange={(e)=>setAnio(e.target.value)}>
          <option value="" disabled>Año</option>
          <option>2025</option>
          <option>2024</option>
          <option>2023</option>
        </select>
      </div>
    </div>
  );
}
