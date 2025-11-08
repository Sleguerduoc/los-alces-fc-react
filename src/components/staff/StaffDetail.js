import React, { useState, useEffect } from "react";

export default function StaffDetail({ staff }) {
  const [form, setForm] = useState({
    nombre: "",
    cargo: "",
    sueldo: "",
    extra: "",
    obs: "",
  });

  useEffect(() => {
    if (staff) {
      setForm({
        nombre: staff.nombre || "",
        cargo: staff.cargo || "",
        sueldo: staff.sueldo || "",
        extra: staff.extra || "",
        obs: staff.obs || "",
      });
    }
  }, [staff]);

  if (!staff) {
    return <p className="text-muted m-0">Selecciona un miembro para ver el detalle.</p>;
  }

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    console.log("Guardar staff:", { id: staff.id, ...form });
    alert("Cambios guardados ");
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="row g-3">
        <div className="col-12 col-md-6">
          <label className="form-label">Nombre completo</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={form.nombre}
            onChange={onChange}
            required
          />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label">Cargo</label>
          <select className="form-select" name="cargo" value={form.cargo} onChange={onChange} required>
            <option>Entrenador</option>
            <option>Asistente</option>
            <option>Fisioterapeuta</option>
            <option>Preparador físico</option>
          </select>
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label">Sueldo</label>
          <input
            type="number"
            className="form-control"
            name="sueldo"
            placeholder="CLP"
            value={form.sueldo}
            onChange={onChange}
            min="0"
          />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label">Valor por hora extra</label>
          <input
            type="number"
            className="form-control"
            name="extra"
            placeholder="CLP"
            value={form.extra}
            onChange={onChange}
            min="0"
          />
        </div>
        <div className="col-12">
          <label className="form-label">Observaciones</label>
          <textarea
            className="form-control"
            name="obs"
            rows="4"
            value={form.obs}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="mt-4">
        <button type="submit" className="btn btn-primary">Guardar</button>
        <button type="button" className="btn btn-secondary ms-2">Historial de Cambios</button>
      </div>
    </form>
  );
}
