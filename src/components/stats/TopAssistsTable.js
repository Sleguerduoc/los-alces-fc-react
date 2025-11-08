import React from "react";

export default function TopAssistsTable({ rows = [] }) {
  return (
    <div className="table-responsive">
      <table className="table table-sm mb-0">
        <thead><tr><th>Jugador</th><th>Asistencias</th></tr></thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}><td>{r.jugador}</td><td>{r.asist}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
