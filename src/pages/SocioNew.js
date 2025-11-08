import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function cleanRut(rut) { return (rut || "").replace(/[^0-9kK]/g, "").toUpperCase(); }
function dvRut(num) {
  let M = 0, S = 1;
  for (; num; num = Math.floor(num / 10)) S = (S + (num % 10) * (9 - (M++ % 6))) % 11;
  return S ? String(S - 1) : "K";
}
function isValidRut(rut) {
  const c = cleanRut(rut);
  if (c.length < 2) return false;
  const cuerpo = c.slice(0, -1);
  const dv = c.slice(-1);
  return dvRut(parseInt(cuerpo, 10)) === dv;
}
function formatRut(rut) {
  let c = cleanRut(rut);
  if (!c) return "";
  const dv = c.slice(-1);
  let cuerpo = c.slice(0, -1);
  let r = "";
  while (cuerpo.length > 3) {
    r = "." + cuerpo.slice(-3) + r;
    cuerpo = cuerpo.slice(0, -3);
  }
  return cuerpo + r + "-" + dv;
}

export default function SocioNew() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    rut: "",
    fechaIngreso: "",
    email: "",
    telefono: "",
    direccion: "",
    estado: "",
  });
  const [touched, setTouched] = useState({});

  const errors = {
    nombre: form.nombre.trim().length < 3 ? "Nombre demasiado corto" : "",
    rut: !form.rut || !isValidRut(form.rut) ? "RUT inválido" : "",
    fechaIngreso: !form.fechaIngreso ? "Requerido" : "",
    email: !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email) ? "Email inválido" : "",
    estado: !form.estado ? "Selecciona estado" : "",
  };

  const invalid = (f) => touched[f] && errors[f];
  const validForm = Object.values(errors).every((v) => v === "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((p) => ({ ...p, [name]: true }));
    if (name === "rut") setForm((p) => ({ ...p, rut: formatRut(p.rut) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ nombre:1, rut:1, fechaIngreso:1, email:1, estado:1 });
    if (!validForm) return;

    console.log("Nuevo socio:", form);
    alert(`Socio "${form.nombre}" creado con éxito `);
    nav("/socios");
  };

  return (
    <div className="container-md py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="m-0">Agregar Nuevo Socio</h2>
        <button className="btn btn-secondary" onClick={() => nav("/socios")}>
          <i className="fas fa-arrow-left me-1"></i>Volver
        </button>
      </div>

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit} noValidate>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label">Nombre completo *</label>
                <input
                  type="text"
                  name="nombre"
                  className={`form-control ${invalid("nombre") ? "is-invalid" : ""}`}
                  value={form.nombre}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {invalid("nombre") && <div className="invalid-feedback">{errors.nombre}</div>}
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label">RUT *</label>
                <input
                  type="text"
                  name="rut"
                  className={`form-control ${invalid("rut") ? "is-invalid" : ""}`}
                  placeholder="11.111.111-1"
                  value={form.rut}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {invalid("rut") && <div className="invalid-feedback">{errors.rut}</div>}
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label">Fecha de ingreso *</label>
                <input
                  type="date"
                  name="fechaIngreso"
                  className={`form-control ${invalid("fechaIngreso") ? "is-invalid" : ""}`}
                  value={form.fechaIngreso}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {invalid("fechaIngreso") && <div className="invalid-feedback">{errors.fechaIngreso}</div>}
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  name="email"
                  className={`form-control ${invalid("email") ? "is-invalid" : ""}`}
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {invalid("email") && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label">Teléfono</label>
                <input
                  type="tel"
                  name="telefono"
                  className="form-control"
                  placeholder="+56 9 1234 5678"
                  value={form.telefono}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label">Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  className="form-control"
                  placeholder="Calle / Avenida"
                  value={form.direccion}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label">Estado *</label>
                <select
                  name="estado"
                  className={`form-select ${invalid("estado") ? "is-invalid" : ""}`}
                  value={form.estado}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                >
                  <option value="">Selecciona estado</option>
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
                {invalid("estado") && <div className="invalid-feedback">{errors.estado}</div>}
              </div>
            </div>

            <div className="mt-4">
              <button type="submit" className="btn btn-primary">
                <i className="fas fa-save me-1"></i>Crear Socio
              </button>
              <button type="reset" className="btn btn-secondary ms-2">
                Limpiar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
