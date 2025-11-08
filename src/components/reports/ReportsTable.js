import React from "react";

function fmtFecha(iso) {
  if (!iso) return "–";
  try { return new Date(iso).toLocaleDateString("es-CL"); } catch { return iso; }
}

export default function ReportsTable({ rows = [], onDownload }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th>Fecha</th>
            <th>Tipo</th>
            <th>Periodo</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td>{fmtFecha(r.fecha)}</td>
              <td>{r.tipo}</td>
              <td>
                {r.desde || r.hasta ? `${fmtFecha(r.desde)} - ${fmtFecha(r.hasta)}` : "Todos"}
              </td>
              <td>
                <button className="btn btn-sm btn-secondary" onClick={() => onDownload(r)}>
                  Descargar
                </button>
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr><td colSpan="4" className="text-center text-muted">Sin reportes</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
