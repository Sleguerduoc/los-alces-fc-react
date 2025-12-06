import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PlayerFilters from "../components/players/PlayerFilters";
import PlayersTable from "../components/players/PlayersTable";
import PlayerDetailTabs from "../components/players/PlayerDetailTabs";

import { getJugadores, updateJugadorById } from "../services/jugadoresService";

export default function PlayersPage() {
  const nav = useNavigate();

  const [players, setPlayers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const [text, setText] = useState("");
  const [posicion, setPosicion] = useState("");
  const [estado, setEstado] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Adaptar jugador desde el backend al formato usado en la UI
  const mapJugadorFromApi = (p) => ({
    id: p._id,
    nombre: p.nombre,
    rut: p.rut || "",
    posicion: p.posicion || "",
    dorsal: p.numeroCamiseta ?? "",
    estado: p.estado || "Activo",
    partidos: p.partidos ?? 0,
    goles: p.goles ?? 0,
    asistencias: p.asistencias ?? 0,
    estadoFisico: p.estadoFisico || "Bueno",
    contratoHasta: p.contratoHasta ? String(p.contratoHasta).slice(0, 10) : "",
    telefono: p.telefono || "",
    fechaNacimiento: p.fechaNacimiento ? String(p.fechaNacimiento).slice(0, 10) : "",
    comentarios: p.comentarios || "",
    foto: p.foto || "",
  });

  useEffect(() => {
    const cargar = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getJugadores();
        const adaptados = data.map(mapJugadorFromApi);
        setPlayers(adaptados);
        if (adaptados.length > 0) {
          setSelectedId(adaptados[0].id);
        }
      } catch (e) {
        console.error(e);
        setError("Error al cargar jugadores desde el servidor");
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  // Filtros
  const filtered = useMemo(() => {
    const q = text.trim().toLowerCase();
    return players.filter((p) =>
      (q
        ? p.nombre.toLowerCase().includes(q) ||
          (p.rut || "").toLowerCase().includes(q) ||
          String(p.dorsal || "").includes(q)
        : true) &&
      (posicion ? p.posicion === posicion : true) &&
      (estado ? p.estado === estado : true)
    );
  }, [players, text, posicion, estado]);

  // Jugador seleccionado (para los tabs de abajo)
  const seleccionado = useMemo(
    () => players.find((p) => p.id === selectedId) || null,
    [players, selectedId]
  );

  const onUpdateJugador = async (id, patch) => {
    try {
      const actual = players.find((p) => p.id === id);
      if (!actual) return;

      const toSend = {
        nombre: patch.nombre ?? actual.nombre,
        rut: patch.rut ?? actual.rut,
        posicion: patch.posicion ?? actual.posicion,
        numeroCamiseta: patch.dorsal ?? actual.dorsal,
        estado: patch.estado ?? actual.estado,
        partidos: patch.partidos ?? actual.partidos,
        goles: patch.goles ?? actual.goles,
        asistencias: patch.asistencias ?? actual.asistencias,
        estadoFisico: patch.estadoFisico ?? actual.estadoFisico,
        contratoHasta: patch.contratoHasta ?? actual.contratoHasta,
        telefono: patch.telefono ?? actual.telefono,
        fechaNacimiento: patch.fechaNacimiento ?? actual.fechaNacimiento,
        comentarios: patch.comentarios ?? actual.comentarios,
      };

      const actualizadoBack = await updateJugadorById(id, toSend);
      const adaptado = mapJugadorFromApi(actualizadoBack);

      setPlayers((prev) => prev.map((p) => (p.id === id ? adaptado : p)));
      alert("Datos del jugador actualizados");
    } catch (e) {
      console.error(e);
      alert("Error al actualizar jugador");
    }
  };

  return (
    <>
      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="m-0">Gestión de Jugadores</h2>
        <button className="btn btn-success" onClick={() => nav("/jugadores/nuevo")}>
          <i className="fas fa-plus me-1"></i>Nuevo Jugador
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {loading && (
        <div className="alert alert-info" role="alert">
          Cargando jugadores…
        </div>
      )}

      {/* Filtros */}
      <div className="card mb-4">
        <div className="card-body">
          <PlayerFilters
            text={text}
            onText={setText}
            posicion={posicion}
            onPosicion={setPosicion}
            estado={estado}
            onEstado={setEstado}
          />
        </div>
      </div>

      {/* Tabla */}
      <div className="card mb-3">
        <div className="card-body p-0">
          <PlayersTable rows={filtered} onPick={setSelectedId} />
        </div>
        <div className="card-footer bg-transparent d-flex justify-content-end">
          <nav>
            <ul className="pagination mb-0">
              <li className="page-item disabled">
                <span className="page-link">Anterior</span>
              </li>
              <li className="page-item active">
                <span className="page-link">1</span>
              </li>
              <li className="page-item">
                <button className="page-link btn btn-link">2</button>
              </li>
              <li className="page-item">
                <button className="page-link btn btn-link">3</button>
              </li>
              <li className="page-item">
                <button className="page-link btn btn-link">Siguiente</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Detalle con tabs */}
      <section className="card">
        <div className="card-body">
          <PlayerDetailTabs player={seleccionado} onUpdate={onUpdateJugador} />
        </div>
      </section>
    </>
  );
}

