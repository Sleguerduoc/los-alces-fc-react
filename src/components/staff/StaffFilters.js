import React from "react";

export default function StaffFilters({ text, onText, cargo, onCargo }) {
  return (
    <div className="row g-3">
      <div className="col-12 col-md-6 col-lg-4">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar nombre…"
          value={text}
          onChange={(e) => onText(e.target.value)}
        />
      </div>
      <div className="col-12 col-md-6 col-lg-4">
        <select
          className="form-select"
          value={cargo}
          onChange={(e) => onCargo(e.target.value)}
        >
          <option value="">Cargo</option>
          <option>Entrenador</option>
          <option>Asistente</option>
          <option>Fisioterapeuta</option>
          <option>Preparador físico</option>
        </select>
      </div>
    </div>
  );
}
