
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  validarNombre, rutValido, formatRut, emailValido, telValido,
  numeroPositivo, numeroNoNegativo, fechaNoFutura, maxLen
} from "../utils/validators";
import { createStaff } from "../services/staffService";


export default function StaffNew() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    rut: "",
    cargo: "",
    correo: "",
    telefono: "",
    sueldo: "",
    valorHora: "",
    fechaIngreso: "",
    observaciones: "",
    foto: null,
  });

  const [touched, setTouched] = useState({});

  // Preview de foto
  const fotoPreview = useMemo(() => {
    if (!form.foto) return null;
    try {
      return URL.createObjectURL(form.foto);
    } catch {
      return null;
    }
  }, [form.foto]);

  const onChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "foto") {
      setForm((p) => ({ ...p, foto: files && files[0] ? files[0] : null }));
    } else {
      setForm((p) => ({ ...p, [name]: value }));
    }
  };

  const onBlur = (e) => {
    const { name } = e.target;
    setTouched((p) => ({ ...p, [name]: true }));
    if (name === "rut" && form.rut) {
      setForm((p) => ({ ...p, rut: formatRut(p.rut) }));
    }
  };

  const errors = {
    nombre: validarNombre(form.nombre) ? "" : "Ingresa el nombre (mínimo 3 caracteres).",
    rut: rutValido(form.rut) ? "" : "RUT inválido. Usa formato 12.345.678-5.",
    cargo: form.cargo ? "" : "Selecciona un cargo.",
    correo: emailValido(form.correo) ? "" : "Correo inválido.",
    telefono: telValido(form.telefono) ? "" : "Teléfono inválido (8–12 dígitos).",
    sueldo: numeroPositivo(form.sueldo) ? "" : "Ingresa un sueldo mayor a 0.",
    valorHora: form.valorHora === "" || numeroNoNegativo(form.valorHora) ? "" : "Debe ser 0 o positivo.",
    fechaIngreso: fechaNoFutura(form.fechaIngreso) ? "" : "Selecciona una fecha válida (no futura).",
    observaciones: maxLen(form.observaciones, 500) ? "" : "Máximo 500 caracteres.",
    foto: form.foto && !/^image\//.test(form.foto.type) ? "El archivo debe ser una imagen." : "",
  };

  const invalid = (name) => touched[name] && errors[name];
  const isValidForm = Object.values(errors).every((e) => e === "");

   const onSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      nombre: true,
      rut: true,
      cargo: true,
      correo: true,
      telefono: true,
      sueldo: true,
      valorHora: true,
      fechaIngreso: true,
      observaciones: true,
      foto: true,
    });
    if (!isValidForm) return;

    try {
      const payload = {
        nombre: form.nombre,
        rut: form.rut,
        cargo: form.cargo,
        correo: form.correo,
        telefono: form.telefono,
        sueldo: form.sueldo,
        valorHora: form.valorHora === "" ? 0 : form.valorHora,
        fechaIngreso: form.fechaIngreso,
        observaciones: form.observaciones,
        // Por ahora la foto solo se usa en front (preview), no se sube al backend
        // foto: "", // si quieres, más adelante podemos guardar un nombre.
      };

      await createStaff(payload);

      alert(`Miembro "${form.nombre}" registrado con éxito ✅`);
      nav("/equipo-tecnico");
    } catch (error) {
      console.error(error);
      alert(error.message || "Error al registrar miembro del staff");
    }
  };


  return (
    <div className="container-md py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="m-0">Nuevo Miembro del Equipo Técnico</h2>
        <button className="btn btn-outline-secondary" onClick={() => nav("/equipo-tecnico")}>
          <i className="fas fa-arrow-left me-1"></i> Volver
        </button>
      </div>

      <section className="card mb-5">
        <div className="card-body">
          <form className="row g-3" onSubmit={onSubmit} noValidate>
            {/* Nombre */}
            <div className="col-12 col-md-6">
              <label className="form-label">Nombre completo *</label>
              <input
                type="text"
                name="nombre"
                className={`form-control ${invalid("nombre") ? "is-invalid" : ""}`}
                value={form.nombre}
                onChange={onChange}
                onBlur={onBlur}
                required
              />
              {invalid("nombre") && <div className="invalid-feedback">{errors.nombre}</div>}
            </div>

            {/* RUT */}
            <div className="col-12 col-md-6">
              <label className="form-label">RUT (con guión) *</label>
              <input
                type="text"
                name="rut"
                className={`form-control ${invalid("rut") ? "is-invalid" : ""}`}
                placeholder="12.345.678-5"
                value={form.rut}
                onChange={onChange}
                onBlur={onBlur}
                required
              />
              {invalid("rut") && <div className="invalid-feedback">{errors.rut}</div>}
            </div>

            {/* Cargo */}
            <div className="col-12 col-md-6">
              <label className="form-label">Cargo *</label>
              <select
                name="cargo"
                className={`form-select ${invalid("cargo") ? "is-invalid" : ""}`}
                value={form.cargo}
                onChange={onChange}
                onBlur={onBlur}
                required
              >
                <option value="" disabled>Selecciona…</option>
                <option>Entrenador</option>
                <option>Asistente</option>
                <option>Fisioterapeuta</option>
                <option>Preparador físico</option>
                <option>Analista</option>
                <option>Utilero</option>
              </select>
              {invalid("cargo") && <div className="invalid-feedback">{errors.cargo}</div>}
            </div>

            {/* Correo */}
            <div className="col-12 col-md-6">
              <label className="form-label">Correo *</label>
              <input
                type="email"
                name="correo"
                className={`form-control ${invalid("correo") ? "is-invalid" : ""}`}
                value={form.correo}
                onChange={onChange}
                onBlur={onBlur}
                required
              />
              {invalid("correo") && <div className="invalid-feedback">{errors.correo}</div>}
            </div>

            {/* Teléfono */}
            <div className="col-12 col-md-6">
              <label className="form-label">Teléfono *</label>
              <input
                type="tel"
                name="telefono"
                placeholder="+569XXXXXXXX"
                className={`form-control ${invalid("telefono") ? "is-invalid" : ""}`}
                value={form.telefono}
                onChange={onChange}
                onBlur={onBlur}
                required
              />
              {invalid("telefono") && <div className="invalid-feedback">{errors.telefono}</div>}
            </div>

            {/* Sueldo */}
            <div className="col-12 col-md-6">
              <label className="form-label">Sueldo (CLP) *</label>
              <input
                type="number"
                name="sueldo"
                min="0"
                step="1000"
                className={`form-control ${invalid("sueldo") ? "is-invalid" : ""}`}
                value={form.sueldo}
                onChange={onChange}
                onBlur={onBlur}
                required
              />
              {invalid("sueldo") && <div className="invalid-feedback">{errors.sueldo}</div>}
            </div>

            {/* Valor hora extra */}
            <div className="col-12 col-md-6">
              <label className="form-label">Valor hora extra (CLP)</label>
              <input
                type="number"
                name="valorHora"
                min="0"
                step="100"
                className={`form-control ${invalid("valorHora") ? "is-invalid" : ""}`}
                value={form.valorHora}
                onChange={onChange}
                onBlur={onBlur}
              />
              {invalid("valorHora") && <div className="invalid-feedback">{errors.valorHora}</div>}
            </div>

            {/* Fecha ingreso */}
            <div className="col-12 col-md-6">
              <label className="form-label">Fecha de ingreso *</label>
              <input
                type="date"
                name="fechaIngreso"
                className={`form-control ${invalid("fechaIngreso") ? "is-invalid" : ""}`}
                value={form.fechaIngreso}
                onChange={onChange}
                onBlur={onBlur}
                required
              />
              {invalid("fechaIngreso") && <div className="invalid-feedback">{errors.fechaIngreso}</div>}
            </div>

            {/* Foto (opcional) */}
            <div className="col-12 col-md-6">
              <label className="form-label">Foto (opcional)</label>
              <input
                type="file"
                name="foto"
                accept="image/*"
                className={`form-control ${invalid("foto") ? "is-invalid" : ""}`}
                onChange={onChange}
                onBlur={onBlur}
              />
              {invalid("foto") && <div className="invalid-feedback">{errors.foto}</div>}
              {fotoPreview && (
                <div className="mt-2">
                  <img
                    src={fotoPreview}
                    alt="Preview"
                    className="rounded"
                    style={{ maxWidth: 120, height: "auto" }}
                  />
                </div>
              )}
              <div className="form-text">Solo imágenes (JPG, PNG, etc.).</div>
            </div>

            {/* Observaciones */}
            <div className="col-12">
              <label className="form-label">Observaciones</label>
              <textarea
                name="observaciones"
                rows="4"
                maxLength={500}
                className={`form-control ${invalid("observaciones") ? "is-invalid" : ""}`}
                value={form.observaciones}
                onChange={onChange}
                onBlur={onBlur}
              />
              {invalid("observaciones") && <div className="invalid-feedback">{errors.observaciones}</div>}
            </div>

            <div className="col-12 mt-2 d-flex gap-2">
              <button type="submit" className="btn btn-primary">
                <i className="fas fa-save me-1"></i> Guardar
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => nav("/equipo-tecnico")}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
