import React from "react";
import PlayerRow from "./PlayerRow";

export default function PlayersTable({ rows, onPick }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th>Foto</th>
            <th>Nombre</th>
            <th>Posición</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <PlayerRow key={r.id} data={r} onPick={onPick} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
