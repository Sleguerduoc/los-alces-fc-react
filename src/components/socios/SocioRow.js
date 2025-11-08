import React from "react";
import { imageForSocio } from "../../data/socios";

const badge = (estado) => estado === "Activo" ? "bg-success" : "bg-secondary";

export default function SocioRow({ data, onPick }) {
  const src = imageForSocio(data.foto || "placeholder.jpg");

  return (
    <tr onClick={() => onPick(data.id)} style={{ cursor: "pointer" }}>
      <td>
        <img src={src} alt="" width="40" height="40" style={{objectFit:"cover", borderRadius:"50%"}} />
      </td>
      <td>{data.nombre}</td>
      <td>{data.rut}</td>
      <td><span className={`badge ${badge(data.estado)}`}>{data.estado}</span></td>
      <td>
        <button className="btn btn-sm btn-primary me-2"><i className="fas fa-edit"></i></button>
        <button className="btn btn-sm btn-danger"><i className="fas fa-trash"></i></button>
      </td>
    </tr>
  );
}
