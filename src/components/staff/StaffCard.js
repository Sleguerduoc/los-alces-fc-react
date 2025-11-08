import React from "react";

export default function StaffCard({ data, onClick }) {
  let src;
  try {
    src = require(`../../assets/img/staff/${data.foto}`);
  } catch {
    src = null;
  }

  return (
    <div className="card text-center h-100" role="button" onClick={onClick}>
      {src ? (
        <img
          src={src}
          alt={data.nombre}
          className="rounded-circle mx-auto mt-3"
          style={{ width: 80, height: 80, objectFit: "cover" }}
        />
      ) : (
        <div
          className="rounded-circle mx-auto mt-3 bg-light"
          style={{ width: 80, height: 80 }}
        />
      )}
      <div className="card-body">
        <h5 className="card-title">{data.nombre}</h5>
        <p className="mb-1">{data.cargo}</p>
        <p className="text-muted">Horas acumuladas: {data.horas}</p>
      </div>
    </div>
  );
}
