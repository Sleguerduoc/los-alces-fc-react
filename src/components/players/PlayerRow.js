import React from "react";
import { getPlayerImage } from "../../utils/getPlayerImage";

export default function PlayerRow({ data, onPick }) {
  const handleClick = () => {
    if (onPick) onPick(data.id);
  };

  return (
    <tr onClick={handleClick} style={{ cursor: "pointer" }}>
      {/* FOTO */}
      <td>
        <img
          src={getPlayerImage(data.foto)}
          alt={data.nombre}
          className="img-thumbnail"
          style={{
            width: "48px",
            height: "48px",
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      </td>

      {/* NOMBRE */}
      <td>{data.nombre}</td>

      {/* POSICIÓN */}
      <td>{data.posicion || "—"}</td>

      {/* ESTADO */}
      <td>
        <span
          className={
            "badge " +
            (data.estado === "Activo"
              ? "bg-success"
              : data.estado === "Lesionado"
              ? "bg-warning text-dark"
              : data.estado === "Suspendido"
              ? "bg-danger"
              : "bg-secondary")
          }
        >
          {data.estado || "Sin estado"}
        </span>
      </td>

      {/* ACCIONES */}
      <td>
        <button
          type="button"
          className="btn btn-sm btn-outline-primary"
          onClick={(e) => {
            e.stopPropagation(); // que no dispare el onClick del <tr>
            if (onPick) onPick(data.id);
          }}
        >
          Ver detalle
        </button>
      </td>
    </tr>
  );
}
