import React from "react";


const badgeClass = (estado) => {
  if (estado === "Activo") return "bg-success";
  if (estado === "Lesionado") return "bg-warning";
  return "bg-secondary";
};

export default function PlayerRow({ data, onPick }) {
  const fotoSrc = (() => {
    try {
      return require(`../../assets/img/jugadores/${data.foto}`);
    } catch {
      return null; 
    }
  })();

  return (
    <tr onClick={() => onPick(data.id)} style={{ cursor: "pointer" }}>
      <td>
        {fotoSrc ? (
          <img src={fotoSrc} alt={data.nombre} className="img-thumbnail" style={{ maxWidth: 60 }} />
        ) : (
          <div className="bg-light rounded" style={{ width: 60, height: 60 }} />
        )}
      </td>
      <td>{data.nombre}</td>
      <td>{data.posicion}</td>
      <td><span className={`badge ${badgeClass(data.estado)}`}>{data.estado}</span></td>
      <td>
        <button className="btn btn-sm btn-primary me-2"><i className="fas fa-edit"></i></button>
        <button className="btn btn-sm btn-danger"><i className="fas fa-trash"></i></button>
      </td>
    </tr>
  );
}
