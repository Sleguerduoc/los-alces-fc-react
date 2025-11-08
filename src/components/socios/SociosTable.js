import React from "react";
import SocioRow from "./SocioRow";

export default function SociosTable({ rows, onPick }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th style={{width:56}}></th> {/* avatar */}
            <th>Nombre</th>
            <th>RUT</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <SocioRow key={r.id} data={r} onPick={onPick} />
          ))}
          {rows.length === 0 && (
            <tr><td colSpan="5" className="text-center text-muted">Sin resultados</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
