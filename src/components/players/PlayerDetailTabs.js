import React, { useMemo, useState } from "react";
import { getPlayerImage } from "../../utils/getPlayerImage";

export default function PlayerDetailTabs({ player }) {
  const [tab, setTab] = useState("personal");
  const p = useMemo(() => player ?? {}, [player]);

  return (
    <>
      <ul className="nav nav-tabs mb-3">
        <div className="text-center mb-3">
  <img
    src={getPlayerImage(p.foto)}
    alt={p.nombre}
    className="img-thumbnail"
    style={{
      width: "150px",
      height: "150px",
      objectFit: "cover",
      borderRadius: "10px",
    }}
  />
</div>
        <li className="nav-item">
          <button
            className={`nav-link ${tab === "personal" ? "active" : ""}`}
            type="button"
            onClick={() => setTab("personal")}
          >
            Datos Personales
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link ${tab === "deportiva" ? "active" : ""}`}
            type="button"
            onClick={() => setTab("deportiva")}
          >
            Información Deportiva
          </button>
        </li>
      </ul>

      {tab === "personal" ? (
        <form className="row g-3">

          <div className="col-12 col-md-6">
            <label className="form-label">Nombre completo</label>
            <input
              type="text"
              className="form-control"
              value={p.nombre || ""}
              readOnly
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label">RUT</label>
            <input
              type="text"
              className="form-control"
              value={p.rut || ""}
              readOnly
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label">Fecha de nacimiento</label>
            <input
              type="date"
              className="form-control"
              value={p.fechaNacimiento || ""}
              readOnly
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label">Teléfono de contacto</label>
            <input
              type="tel"
              className="form-control"
              value={p.telefono || ""}
              readOnly
            />
          </div>

          <div className="col-12">
            <label className="form-label">Comentarios</label>
            <textarea
              className="form-control"
              rows="3"
              value={p.comentarios || ""}
              readOnly
            />
          </div>

          <div className="col-12">
            <button type="button" className="btn btn-outline-secondary">
              Historial de Cambios
            </button>
          </div>

        </form>
      ) : (
        <form className="row g-3">

          <div className="col-12 col-md-4">
            <label className="form-label">Posición</label>
            <select className="form-select" value={p.posicion || ""} disabled>
              <option value="">Selecciona posición</option>
              <option>Arquero</option>
              <option>Defensa</option>
              <option>Volante</option>
              <option>Delantero</option>
            </select>
          </div>

          <div className="col-12 col-md-4">
            <label className="form-label">Número de camiseta</label>
            <input
              type="number"
              className="form-control"
              value={p.dorsal || ""}
              readOnly
            />
          </div>

          <div className="col-12 col-md-4">
            <label className="form-label">Partidos jugados</label>
            <input
              type="number"
              className="form-control"
              value={p.partidos ?? ""}
              readOnly
            />
          </div>

          <div className="col-12 col-md-4">
            <label className="form-label">Goles totales</label>
            <input
              type="number"
              className="form-control"
              value={p.goles ?? ""}
              readOnly
            />
          </div>

          <div className="col-12 col-md-4">
            <label className="form-label">Asistencias totales</label>
            <input
              type="number"
              className="form-control"
              value={p.asistencias ?? ""}
              readOnly
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label">Estado físico</label>
            <select className="form-select" value={p.estadoFisico || ""} disabled>
              <option value="">Selecciona estado</option>
              <option>Bueno</option>
              <option>Lesionado</option>
              <option>Recuperación</option>
            </select>
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label">Contrato hasta</label>
            <input
              type="date"
              className="form-control"
              value={p.contratoHasta || ""}
              readOnly
            />
          </div>

          <div className="col-12">
            <label className="form-label">Comentarios</label>
            <textarea
              className="form-control"
              rows="3"
              value={p.comentarios || ""}
              readOnly
            />
          </div>

          <div className="col-12">
            <button type="button" className="btn btn-outline-secondary">
              Historial de Cambios
            </button>
          </div>

        </form>
      )}
    </>
  );
}
