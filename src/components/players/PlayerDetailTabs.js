import React, { useMemo, useState } from "react";

export default function PlayerDetailTabs({ player }) {
  const [tab, setTab] = useState("personal");
  const p = useMemo(() => player ?? {}, [player]);

  return (
    <>
      <ul className="nav nav-tabs mb-3">
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
            <input type="text" className="form-control" defaultValue={p.nombre || ""} />
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label">RUT</label>
            <input type="text" className="form-control" defaultValue={"11.111.111-1"} />
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label">Fecha de nacimiento</label>
            <input type="date" className="form-control" defaultValue={"1995-02-10"} />
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label">Teléfono de contacto</label>
            <input type="tel" className="form-control" defaultValue={"+56 9 0000 0000"} />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">Guardar</button>
            <button type="reset" className="btn btn-secondary ms-2">Cancelar</button>
            <button type="button" className="btn btn-outline-secondary ms-2">Historial de Cambios</button>
          </div>
        </form>
      ) : (
        <form className="row g-3">
          <div className="col-12 col-md-4">
            <label className="form-label">Posición</label>
            <select className="form-select" defaultValue="">
              <option value="" disabled>Selecciona posición</option>
              <option>Arquero</option>
              <option>Defensa</option>
              <option>Volante</option>
              <option>Delantero</option>
            </select>
          </div>
          <div className="col-12 col-md-4">
            <label className="form-label">Número de camiseta</label>
            <input type="number" className="form-control" min="1" max="99" placeholder="—" />
          </div>
          <div className="col-12 col-md-4">
            <label className="form-label">Fecha de debut</label>
            <input type="date" className="form-control" />
          </div>
          <div className="col-12 col-md-4">
            <label className="form-label">Partidos jugados</label>
            <input type="number" className="form-control" min="0" defaultValue="0" />
          </div>
          <div className="col-12 col-md-4">
            <label className="form-label">Goles totales</label>
            <input type="number" className="form-control" min="0" defaultValue="0" />
          </div>
          <div className="col-12 col-md-4">
            <label className="form-label">Asistencias totales</label>
            <input type="number" className="form-control" min="0" defaultValue="0" />
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label">Estado físico</label>
            <select className="form-select" defaultValue="">
              <option value="" disabled>Selecciona estado</option>
              <option>Bueno</option>
              <option>Lesionado</option>
              <option>Recuperación</option>
            </select>
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label">Contrato hasta</label>
            <input type="date" className="form-control" />
          </div>
          <div className="col-12">
            <label className="form-label">Comentarios</label>
            <textarea className="form-control" rows="3" placeholder="Observaciones deportivas..."></textarea>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">Guardar</button>
            <button type="reset" className="btn btn-secondary ms-2">Cancelar</button>
            <button type="button" className="btn btn-outline-secondary ms-2">Historial de Cambios</button>
          </div>
        </form>
      )}
    </>
  );
}
