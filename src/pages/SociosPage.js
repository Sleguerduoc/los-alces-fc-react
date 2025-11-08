// src/pages/SociosPage.js
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SociosFilters from "../components/socios/SociosFilters";
import SociosTable from "../components/socios/SociosTable";
import SocioDetailTabs from "../components/socios/SocioDetailTabs";
import SocioPagoForm from "../components/socios/SocioPagoForm";


import SOCIOS from "../data/socios";

export default function SociosPage() {
  const nav = useNavigate();


  const [socios, setSocios] = useState(SOCIOS);

  // Filtros
  const [text, setText] = useState("");
  const [estado, setEstado] = useState("");

  const filtrados = useMemo(() => {
    const t = text.trim().toLowerCase();
    return socios.filter((s) =>
      (t ? s.nombre.toLowerCase().includes(t) || s.rut.toLowerCase().includes(t) : true) &&
      (estado ? s.estado === estado : true)
    );
  }, [socios, text, estado]);

  
  const [selectedId, setSelectedId] = useState(socios[0]?.id ?? null);
  const seleccionado = useMemo(
    () => socios.find((s) => s.id === selectedId) || null,
    [socios, selectedId]
  );

  
  const onUpdateSocio = (id, patch) => {
    setSocios((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
    alert("Datos del socio actualizados ");
  };

  
  const onRegistrarPago = (payload) => {
    console.log("Pago registrado:", payload);
    alert(
      `Pago registrado para ${payload.socio} por CLP ${Number(payload.monto).toLocaleString("es-CL")} `
    );
  };

  return (
    <>
      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="m-0">Gestión de Socios</h2>
        <button className="btn btn-success" onClick={() => nav("/socios/nuevo")}>
          <i className="fas fa-plus me-1"></i>Nuevo Socio
        </button>
      </div>

      {/* Filtros */}
      <div className="card mb-4">
        <div className="card-body">
          <SociosFilters text={text} onText={setText} estado={estado} onEstado={setEstado} />
        </div>
      </div>

      {/* Tabla */}
      <div className="card mb-4">
        <div className="card-body p-0">
          <SociosTable rows={filtrados} onPick={setSelectedId} />
        </div>
      </div>

      {}
      <div className="card mb-5">
        <div className="card-body">
          <ul className="nav nav-tabs mb-3">
            <li className="nav-item">
              <button
                className="nav-link active"
                id="tab-datos"
                data-bs-toggle="tab"
                data-bs-target="#pane-datos"
                type="button"
              >
                Datos Socio
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link"
                id="tab-pago"
                data-bs-toggle="tab"
                data-bs-target="#pane-pago"
                type="button"
              >
                Registrar Pago
              </button>
            </li>
          </ul>

          <div className="tab-content">
            <div className="tab-pane fade show active" id="pane-datos">
              <SocioDetailTabs socio={seleccionado} onUpdate={onUpdateSocio} />
            </div>
            <div className="tab-pane fade" id="pane-pago">
              <SocioPagoForm socios={socios} onRegistrar={onRegistrarPago} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
