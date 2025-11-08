import React from "react";
import IncomeChart from "../components/charts/IncomeChart";
import ScorersChart from "../components/charts/ScorersChart";

export default function DashboardHome() {
  return (
    <>
      {}
      <div className="row g-3">
        <div className="col-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Jugadores activos</h5>
              <p className="display-6">24</p>
              <p className="text-success">+53% este mes</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Ingresos recientes</h5>
              <p className="display-6">$12,500</p>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Alertas</h5>
              <p className="display-6">8</p>
              <p className="text-warning">Cuotas pendientes</p>
            </div>
          </div>
        </div>
      </div>

      {}
      <div className="row g-3 mt-4">
        <div className="col-12 col-md-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Ingresos vs. Egresos</h5>
              <IncomeChart />
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Próximos partidos</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between"><span>25 Abr</span><span>CD Fero</span></li>
                <li className="list-group-item d-flex justify-content-between"><span>3 May</span><span>Dep. Valdivia</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {}
      <div className="row g-3 mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Máximos goleadores</h5>
              <ScorersChart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
