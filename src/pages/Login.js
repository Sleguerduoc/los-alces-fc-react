import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/logo/logo.png";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

export default function Login() {
  const resetFormRef = useRef(null);
  const nav = useNavigate();

  const [username, setUsername] = useState("");   
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    document.body.classList.add("login-bg");
    return () => document.body.classList.remove("login-bg");
  }, []);

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!username || !password) {
      setErrorMsg("Debes ingresar usuario y contraseña");
      return;
    }

    try {
      setLoading(true);

      const resp = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ email: username, password }),
      });

      if (!resp.ok) {
        let msg = "Credenciales inválidas";
        try {
          const data = await resp.json();
          if (data && data.mensaje) msg = data.mensaje;
        } catch {
          // ignorar error de parseo
        }
        throw new Error(msg);
      }

      const data = await resp.json();
      const user = data.user;

      
      localStorage.setItem("siga_auth", "ok");
      localStorage.setItem("siga_user", JSON.stringify(user));

      
      nav("/dashboard", { replace: true });
    } catch (err) {
      setErrorMsg(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
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

        {errorMsg && (
          <div className="alert alert-danger py-2">{errorMsg}</div>
        )}

        <form onSubmit={handleSubmitLogin}>
          <div className="mb-3">
            <input
              name="username"
              className="form-control"
              placeholder="Usuario / correo"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Contraseña"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Iniciar Sesión"}
          </button>
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

      {/* Modal recuperar contraseña */}
      <div
        className="modal fade"
        id="forgotPasswordModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-sm modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Recuperar Contraseña</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Cerrar"
              ></button>
            </div>
            <div className="modal-body">
              <form ref={resetFormRef} onSubmit={handleResetSubmit}>
                <div className="mb-3">
                  <label htmlFor="resetEmail" className="form-label">
                    Correo electrónico:
                  </label>
                  <input
                    id="resetEmail"
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="tu@correo.com"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Enviar enlace
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
