import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo/logo.png";

export default function Header() {
  const nav = useNavigate();

 
  let userName = "Usuario";
  try {
    const raw = localStorage.getItem("siga_user");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.nombre) {
        userName = parsed.nombre;
      }
    }
  } catch {
   
  }

  const logout = () => {
    // Limpiamos la sesión que usa el login
    localStorage.removeItem("siga_auth");
    localStorage.removeItem("siga_user");
    nav("/login", { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary position-relative">
      <div className="container-fluid">
        {/* botón sidebar móvil */}
        <button
          className="btn btn-primary d-lg-none me-2"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#sidebar"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* brand */}
        <NavLink
          className="navbar-brand d-flex align-items-center"
          to="/dashboard"
        >
          <img
            src={logo}
            alt="Logo Los Alces F.C."
            style={{ height: 120 }}
            className="me-2"
          />
          SIGA – LOS ALCES F.C.
        </NavLink>

        {/* derecha */}
        <div className="ms-auto d-none d-lg-flex align-items-center">
          {/* Notificaciones */}
          <div className="dropdown me-3">
            <button
              className="btn btn-link text-white position-relative dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              <i className="fas fa-bell fa-lg"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                8
              </span>
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end"
              style={{ minWidth: 250 }}
            >
              <li>
                <h6 className="dropdown-header">Notificaciones</h6>
              </li>
              <li>
                <button className="dropdown-item">
                  🔔 Recordatorio: Pago de socio
                </button>
              </li>
              <li>
                <button className="dropdown-item">
                  📩 Tienes un nuevo mensaje
                </button>
              </li>
              <li>
                <button className="dropdown-item">
                  ⚽ Nuevo partido agendado
                </button>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button className="dropdown-item text-center">
                  Ver todas
                </button>
              </li>
            </ul>
          </div>

          {/* Usuario */}
          <div className="dropdown">
            <button
              className="btn btn-link text-white dropdown-toggle d-flex align-items-center gap-1"
              data-bs-toggle="dropdown"
            >
              <i className="fas fa-user-circle fa-lg"></i>
              <span className="d-none d-xl-inline">{userName}</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => nav("/perfil")}
                >
                  Mi Perfil
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => nav("/configuracion")}
                >
                  Configuración
                </button>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={logout}
                >
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
