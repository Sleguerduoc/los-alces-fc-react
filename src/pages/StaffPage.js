// src/pages/StaffPage.js
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import StaffFilters from "../components/staff/StaffFilters";
import StaffGrid from "../components/staff/StaffGrid";
import StaffDetail from "../components/staff/StaffDetail";


import STAFF, { imageForStaff } from "../data/staff";

export default function StaffPage() {
  
  const [staff] = useState(STAFF);

  // filtros
  const [text, setText] = useState("");
  const [cargo, setCargo] = useState("");

  const filtered = useMemo(() => {
    const t = text.trim().toLowerCase();
    return staff.filter((s) =>
      (t ? s.nombre.toLowerCase().includes(t) : true) &&
      (cargo ? s.cargo === cargo : true)
    );
  }, [staff, text, cargo]);

  const [selectedId, setSelectedId] = useState(staff[0]?.id ?? null);
  const seleccionado = useMemo(
    () => staff.find((s) => s.id === selectedId) || null,
    [staff, selectedId]
  );

  const nav = useNavigate();

  return (
    <>
      {/* Encabezado y acción */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="m-0">Equipo Técnico</h2>
        <button
          className="btn btn-success"
          onClick={() => nav("/equipo-tecnico/nuevo")}
        >
          <i className="fas fa-plus me-1"></i>
          Nuevo Miembro
        </button>
      </div>

      {/* Filtros */}
      <div className="card mb-4">
        <div className="card-body">
          <StaffFilters
            text={text}
            onText={setText}
            cargo={cargo}
            onCargo={setCargo}
          />
        </div>
      </div>

      {/* Tarjetas */}
      <div className="card mb-4">
        <div className="card-body">
          <StaffGrid rows={filtered} onPick={setSelectedId} />
        </div>
      </div>

      {/* Seleccionado */}
      {seleccionado && (
        <div className="mb-4">
          <div className="card">
            <div className="card-body d-flex">
              {(() => {
                const src = imageForStaff(seleccionado.foto || "placeholder.jpg");
                return (
                  <img
                    src={src}
                    alt={seleccionado.nombre}
                    className="rounded-circle me-3"
                    style={{ width: 80, height: 80, objectFit: "cover" }}
                  />
                );
              })()}
              <div>
                <h5 className="mb-1">{seleccionado.nombre}</h5>
                <p className="mb-1">{seleccionado.cargo}</p>
                <p className="text-muted m-0">
                  Horas acumuladas: {seleccionado.horas}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Formulario de detalle */}
      <section className="card mb-5">
        <div className="card-body">
          <StaffDetail staff={seleccionado} />
        </div>
      </section>
    </>
  );
}
