import React from "react";

export default function PlayerFilters({ text, onText, posicion, onPosicion, estado, onEstado }) {
  return (
    <div className="row g-3">
      <div className="col-12 col-md-4">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar nombre o RUT…"
          value={text}
          onChange={(e) => onText(e.target.value)}
        />
      </div>
      <div className="col-6 col-md-4">
        <select className="form-select" value={posicion} onChange={(e) => onPosicion(e.target.value)}>
          <option value="">Posición</option>
          <option>Delantero</option>
          <option>Defensa</option>
          <option>Arquero</option>
          <option>Volante</option>
        </select>
      </div>
      <div className="col-6 col-md-4">
        <select className="form-select" value={estado} onChange={(e) => onEstado(e.target.value)}>
          <option value="">Estado</option>
          <option>Activo</option>
          <option>Lesionado</option>
          <option>Inactivo</option>
        </select>
      </div>
    </div>
  );
}
