import React from "react";

export default function SociosFilters({ text, onText, estado, onEstado }) {
  return (
    <div className="row g-3">
      <div className="col-12 col-md-6">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar nombre o RUT…"
          value={text}
          onChange={(e) => onText(e.target.value)}
        />
      </div>
      <div className="col-12 col-md-6">
        <select className="form-select" value={estado} onChange={(e) => onEstado(e.target.value)}>
          <option value="">Estado</option>
          <option>Activo</option>
          <option>Inactivo</option>
        </select>
      </div>
    </div>
  );
}
