// src/pages/PlayersPage.js
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PlayerFilters from "../components/players/PlayerFilters";
import PlayersTable from "../components/players/PlayersTable";
import PlayerDetailTabs from "../components/players/PlayerDetailTabs";


import JUGADORES from "../data/jugadores";

export default function PlayersPage() {
  const nav = useNavigate();

  
  const [players] = useState(JUGADORES);

  
  const [text, setText] = useState("");
  const [posicion, setPosicion] = useState("");     // Arquero | Defensa | Volante | Delantero
  const [estado, setEstado] = useState("");         // Activo | Lesionado | Suspendido

  
  const filtered = useMemo(() => {
    const q = text.trim().toLowerCase();
    return players.filter((p) =>
      (q ? (p.nombre.toLowerCase().includes(q) || String(p.dorsal || "").includes(q)) : true) &&
      (posicion ? p.posicion === posicion : true) &&
      (estado ? p.estado === estado : true)
    );
  }, [players, text, posicion, estado]);

  
  const [selectedId, setSelectedId] = useState(players[0]?.id ?? null);
  const seleccionado = useMemo(
    () => players.find((p) => p.id === selectedId) || null,
    [players, selectedId]
  );

  return (
    <>
      {}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="m-0">Gestión de Jugadores</h2>
        <button className="btn btn-success" onClick={() => nav("/jugadores/nuevo")}>
          <i className="fas fa-plus me-1"></i>Nuevo Jugador
        </button>
      </div>

      {}
      <div className="card mb-4">
        <div className="card-body">
          <PlayerFilters
            text={text} onText={setText}
            posicion={posicion} onPosicion={setPosicion}
            estado={estado} onEstado={setEstado}
          />
        </div>
      </div>

      {/* Tabla */}
      <div className="card mb-3">
        <div className="card-body p-0">
          <PlayersTable rows={filtered} onPick={setSelectedId} />
        </div>
        {/* Footer de paginación (placeholder) */}
        <div className="card-footer bg-transparent d-flex justify-content-end">
          <nav>
            <ul className="pagination mb-0">
              <li className="page-item disabled"><span className="page-link">Anterior</span></li>
              <li className="page-item active"><span className="page-link">1</span></li>
              <li className="page-item"><button className="page-link btn btn-link">2</button></li>
              <li className="page-item"><button className="page-link btn btn-link">3</button></li>
              <li className="page-item"><button className="page-link btn btn-link">Siguiente</button></li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Detalle con tabs */}
      <section className="card">
        <div className="card-body">
          <PlayerDetailTabs player={seleccionado} />
        </div>
      </section>
    </>
  );
}
