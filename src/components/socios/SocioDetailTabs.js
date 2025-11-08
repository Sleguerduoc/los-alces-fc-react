import React, { useEffect, useState } from "react";

export default function SocioDetailTabs({ socio, onUpdate }) {
  const [form, setForm] = useState({
    nombre: "",
    rut: "",
    fechaIngreso: "",
    email: "",
    telefono: "",
    direccion: "",
    estado: "Activo",
  });

  useEffect(() => {
    if (socio) {
      setForm({
        nombre: socio.nombre || "",
        rut: socio.rut || "",
        fechaIngreso: socio.fechaIngreso || "",
        email: socio.email || "",
        telefono: socio.telefono || "",
        direccion: socio.direccion || "",
        estado: socio.estado || "Activo",
      });
    }
  }, [socio]);

  if (!socio) {
    return <p className="text-muted m-0">Selecciona un socio para ver/editar sus datos.</p>;
  }

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onUpdate(socio.id, form);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="row g-3">
        <div className="col-12 col-md-6">
          <label className="form-label">Nombre completo</label>
          <input type="text" className="form-control" name="nombre" value={form.nombre} onChange={onChange} required />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label">RUT</label>
          <input type="text" className="form-control" name="rut" value={form.rut} onChange={onChange} required />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label">Fecha de ingreso</label>
          <input type="date" className="form-control" name="fechaIngreso" value={form.fechaIngreso} onChange={onChange} />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" value={form.email} onChange={onChange} />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label">Teléfono</label>
          <input type="tel" className="form-control" name="telefono" value={form.telefono} onChange={onChange} />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label">Dirección</label>
          <input type="text" className="form-control" name="direccion" value={form.direccion} onChange={onChange} />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label">Estado</label>
          <select className="form-select" name="estado" value={form.estado} onChange={onChange}>
            <option>Activo</option>
            <option>Inactivo</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <button type="submit" className="btn btn-primary">Guardar</button>
        <button type="reset" className="btn btn-secondary ms-2">Cancelar</button>
      </div>
    </form>
  );
}
