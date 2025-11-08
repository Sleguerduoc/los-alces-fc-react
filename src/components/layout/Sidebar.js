import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="offcanvas-lg offcanvas-start bg-light" tabIndex="-1" id="sidebar">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">Menú</h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
      </div>
      <div className="offcanvas-body p-0">
        <nav className="nav flex-column">
          <NavLink className="nav-link" to="/dashboard"><i className="fas fa-tachometer-alt me-2"></i>Dashboard</NavLink>
          <NavLink className="nav-link" to="/jugadores"><i className="fas fa-user me-2"></i>Jugadores</NavLink>
          <NavLink className="nav-link" to="/equipo-tecnico"><i className="fas fa-user-tie me-2"></i>Equipo Técnico</NavLink>
          <NavLink className="nav-link" to="/estadisticas"><i className="fas fa-chart-bar me-2"></i>Estadísticas</NavLink>
          <NavLink className="nav-link" to="/finanzas"><i className="fas fa-dollar-sign me-2"></i>Finanzas</NavLink>
          <NavLink className="nav-link" to="/socios"><i className="fas fa-handshake me-2"></i>Socios</NavLink>
          <NavLink className="nav-link" to="/reportes"><i className="fas fa-file-alt me-2"></i>Reportes</NavLink>
          <NavLink className="nav-link" to="/merch"><i className="fas fa-shirt me-2"></i>Tienda</NavLink>
        </nav>
      </div>
    </div>
  );
}
