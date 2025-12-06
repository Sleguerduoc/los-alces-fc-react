import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SociosFilters from "../components/socios/SociosFilters";
import SociosTable from "../components/socios/SociosTable";
import SocioDetailTabs from "../components/socios/SocioDetailTabs";
import SocioPagoForm from "../components/socios/SocioPagoForm";

import { getSocios, updateSocioById } from "../services/sociosService";

export default function SociosPage() {
  const nav = useNavigate();

  const [socios, setSocios] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const [text, setText] = useState("");
  const [estado, setEstado] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const mapSocioFromApi = (s) => ({
    id: s._id, 
    nombre: s.nombre,
    rut: s.rut,
    estado: s.estado
      ? s.estado.charAt(0).toUpperCase() + s.estado.slice(1) 
      : "Activo",
    email: s.email || "",
    telefono: s.telefono || "",
    direccion: s.direccion || "",
    fechaIngreso: s.fechaIngreso ? String(s.fechaIngreso).slice(0, 10) : "",
    foto: "placeholder.jpg",
  });


  useEffect(() => {
    const cargarSocios = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getSocios();
        const adaptados = data.map(mapSocioFromApi);
        setSocios(adaptados);
        if (adaptados.length > 0) {
          setSelectedId(adaptados[0].id);
        }
      } catch (e) {
        console.error(e);
        setError("Error al cargar socios desde el servidor");
      } finally {
        setLoading(false);
      }
    };

    cargarSocios();
  }, []);


  const filtrados = useMemo(() => {
    const t = text.trim().toLowerCase();
    return socios.filter((s) =>
      (t
        ? s.nombre.toLowerCase().includes(t) ||
          s.rut.toLowerCase().includes(t)
        : true) && (estado ? s.estado === estado : true)
    );
  }, [socios, text, estado]);

  const seleccionado = useMemo(
    () => socios.find((s) => s.id === selectedId) || null,
    [socios, selectedId]
  );


  const onUpdateSocio = async (id, patch) => {
    try {
      const actual = socios.find((s) => s.id === id);
      if (!actual) return;

      const toSend = {
        nombre: patch.nombre ?? actual.nombre,
        rut: patch.rut ?? actual.rut,
        fechaIngreso: patch.fechaIngreso ?? actual.fechaIngreso,
        email: patch.email ?? actual.email,
        telefono: patch.telefono ?? actual.telefono,
        direccion: patch.direccion ?? actual.direccion,
        estado: patch.estado ?? actual.estado,
      };

      const actualizadoBack = await updateSocioById(id, toSend);
      const adaptado = mapSocioFromApi(actualizadoBack);

      setSocios((prev) => prev.map((s) => (s.id === id ? adaptado : s)));
      alert("Datos del socio actualizados");
    } catch (e) {
      console.error(e);
      alert("Error al actualizar socio");
    }
  };

  const onRegistrarPago = (payload) => {
    console.log("Pago registrado:", payload);
    alert(
      `Pago registrado para ${payload.socio} por CLP ${Number(
        payload.monto
      ).toLocaleString("es-CL")} `
    );
  };

  return (
    <>
      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="m-0">Gestión de Socios</h2>
        <button
          className="btn btn-success"
          onClick={() => nav("/socios/nuevo")}
        >
          <i className="fas fa-plus me-1"></i>Nuevo Socio
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {loading && (
        <div className="alert alert-info" role="alert">
          Cargando socios…
        </div>
      )}

      {/* Filtros */}
      <div className="card mb-4">
        <div className="card-body">
          <SociosFilters
            text={text}
            onText={setText}
            estado={estado}
            onEstado={setEstado}
          />
        </div>
      </div>

      {/* Tabla */}
      <div className="card mb-4">
        <div className="card-body p-0">
          <SociosTable rows={filtrados} onPick={setSelectedId} />
        </div>
      </div>

      {/* Detalle y pagos */}
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
