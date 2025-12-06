import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import StaffFilters from "../components/staff/StaffFilters";
import StaffGrid from "../components/staff/StaffGrid";
import StaffDetail from "../components/staff/StaffDetail";

import { getStaff } from "../services/staffService";

export default function StaffPage() {
  const [staff, setStaff] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  // filtros
  const [text, setText] = useState("");
  const [cargo, setCargo] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const nav = useNavigate();


  const mapStaffFromApi = (s) => ({
    id: s._id,
    nombre: s.nombre,
    cargo: s.cargo,
    correo: s.correo || "",
    telefono: s.telefono || "",
    sueldo: s.sueldo ?? 0,
    extra: s.valorHora ?? 0,      
    obs: s.observaciones || "",
    horas: s.horas ?? 0,          
    foto: s.foto || "placeholder.jpg",
  });

  useEffect(() => {
    const cargar = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getStaff();
        const adaptados = data.map(mapStaffFromApi);
        setStaff(adaptados);
        if (adaptados.length > 0) {
          setSelectedId(adaptados[0].id);
        }
      } catch (e) {
        console.error(e);
        setError("Error al cargar equipo técnico desde el servidor");
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  const filtered = useMemo(() => {
    const t = text.trim().toLowerCase();
    return staff.filter((s) =>
      (t ? s.nombre.toLowerCase().includes(t) : true) &&
      (cargo ? s.cargo === cargo : true)
    );
  }, [staff, text, cargo]);

  const seleccionado = useMemo(
    () => staff.find((s) => s.id === selectedId) || null,
    [staff, selectedId]
  );

  
  const getStaffImg = (fileName) => {
    try {
      return require(`../assets/img/staff/${fileName}`);
    } catch {
      try {
        return require(`../assets/img/staff/placeholder.jpg`);
      } catch {
        return "";
      }
    }
  };

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

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {loading && (
        <div className="alert alert-info" role="alert">
          Cargando equipo técnico…
        </div>
      )}

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
              <img
                src={getStaffImg(seleccionado.foto || "placeholder.jpg")}
                alt={seleccionado.nombre}
                className="rounded-circle me-3"
                style={{ width: 80, height: 80, objectFit: "cover" }}
              />
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

      {/* Formulario de detalle  */}
      <section className="card mb-5">
        <div className="card-body">
          <StaffDetail staff={seleccionado} />
        </div>
      </section>
    </>
  );
}
