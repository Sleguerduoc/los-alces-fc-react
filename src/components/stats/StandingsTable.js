import React from "react";

export default function StandingsTable({ rows = [] }) {
  return (
    <div className="table-responsive">
      <table className="table table-sm mb-0">
        <thead>
          <tr><th>PJ</th><th>G</th><th>E</th><th>P</th><th>GF</th><th>GC</th><th>Pts</th></tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>{r.pj}</td><td>{r.g}</td><td>{r.e}</td>
              <td>{r.p}</td><td>{r.gf}</td><td>{r.gc}</td><td>{r.pts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
