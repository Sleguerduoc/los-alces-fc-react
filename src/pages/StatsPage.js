import React, { useMemo, useState } from "react";
import StatsFilters from "../components/stats/StatsFilters";
import StandingsTable from "../components/stats/StandingsTable";
import PointsLineChart from "../components/stats/PointsLineChart";
import TopScorersTable from "../components/stats/TopScorersTable";
import TopAssistsTable from "../components/stats/TopAssistsTable";

export default function StatsPage() {
  
  const [division, setDivision] = useState("");
  const [condicion, setCondicion] = useState("");
  const [anio, setAnio] = useState("");

  
  const standings = useMemo(() => ([
    { pj: 12, g: 8, e: 2, p: 2, gf: 23, gc: 8, pts: 26 }
  ]), []);
  const pointsSeries = useMemo(() => [0,5,10,8,15,18,28,24,20], []);
  const topScorers = useMemo(() => ([
    { jugador: "Carlos Soto", goles: 10 },
    { jugador: "Pedro González", goles: 9 },
  ]), []);
  const topAssists = useMemo(() => ([
    { jugador: "Javier López", asist: 7 },
    { jugador: "María Pérez", asist: 6 },
  ]), []);

  const onGenerate = () => alert("Generar tabla de posiciones (demo)");
  const onExport = () => alert("Exportar reporte (demo)");

  return (
    <>
      {}
      <div className="card mb-4">
        <div className="card-body">
          <StatsFilters
            division={division} setDivision={setDivision}
            condicion={condicion} setCondicion={setCondicion}
            anio={anio} setAnio={setAnio}
          />
        </div>
      </div>

      {}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6 col-lg-3">
          <div className="card">
            <div className="card-body p-2">
              <h5 className="card-title">Tabla de Posiciones</h5>
              <StandingsTable rows={standings} />
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-3">
          <div className="card">
            <div className="card-body p-2">
              <h5 className="card-title">Evolución de Puntos</h5>
              <PointsLineChart data={pointsSeries} />
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-3">
          <div className="card">
            <div className="card-body p-2">
              <h5 className="card-title">Goleadores Destacados</h5>
              <TopScorersTable rows={topScorers} />
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-3">
          <div className="card">
            <div className="card-body p-2">
              <h5 className="card-title">Asistencias Destacadas</h5>
              <TopAssistsTable rows={topAssists} />
            </div>
          </div>
        </div>
      </div>

      {}
      <div className="mb-3">
        <button className="btn btn-secondary me-2" onClick={onGenerate}>
          Generar tabla de posiciones
        </button>
        <button className="btn btn-primary" onClick={onExport}>
          Exportar reporte
        </button>
      </div>
    </>
  );
}
