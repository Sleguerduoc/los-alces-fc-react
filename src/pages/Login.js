import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/logo/logo.png";

export default function Login() {
  const resetFormRef = useRef(null);
  const nav = useNavigate();

  useEffect(() => {
    document.body.classList.add("login-bg");
    return () => document.body.classList.remove("login-bg");
  }, []);

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    
    localStorage.setItem("siga_auth", "ok");
    nav("/dashboard");
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    const modalEl = document.getElementById("forgotPasswordModal");
    const modal = window.bootstrap?.Modal.getOrCreateInstance(modalEl);
    modal?.hide();
    resetFormRef.current?.reset();
  };

  return (
    <div className="login-bg d-flex align-items-center justify-content-center min-vh-100">
      <div className="card p-4 shadow w-100" style={{ maxWidth: 420 }}>
        <div className="text-center mb-3">
          <img src={logo} alt="Logo Los Alces F.C." className="login-logo" />
          <h1 className="h4 mt-2">SIGA – LOS ALCES F.C.</h1>
        </div>

        <h2 className="h5 mb-3 text-center">Iniciar Sesión</h2>

        <form onSubmit={handleSubmitLogin}>
          <div className="mb-3">
            <input name="username" className="form-control" placeholder="Usuario" required />
          </div>
          <div className="mb-3">
            <input type="password" name="password" className="form-control" placeholder="Contraseña" required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
        </form>

        <div className="text-center mt-2">
          <button
            type="button"
            className="btn btn-link link-secondary p-0"
            data-bs-toggle="modal"
            data-bs-target="#forgotPasswordModal"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>
      </div>

      {}
      <div className="modal fade" id="forgotPasswordModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-sm modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Recuperar Contraseña</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div className="modal-body">
              <form ref={resetFormRef} onSubmit={handleResetSubmit}>
                <div className="mb-3">
                  <label htmlFor="resetEmail" className="form-label">Correo electrónico:</label>
                  <input id="resetEmail" name="email" type="email" className="form-control" placeholder="tu@correo.com" required />
                </div>
                <button type="submit" className="btn btn-primary w-100">Enviar enlace</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
