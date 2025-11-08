import React, { useMemo, useState } from "react";

export default function SocioPagoForm({ socios = [], onRegistrar }) {
  const [form, setForm] = useState({
    socioId: "", fecha: "", monto: "", metodo: "Transferencia"
  });
  const [err, setErr] = useState("");

  const socioNombre = useMemo(() => {
    const s = socios.find(x => String(x.id) === String(form.socioId));
    return s?.nombre || "";
  }, [socios, form.socioId]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.socioId) return setErr("Selecciona un socio.");
    if (!form.fecha) return setErr("Selecciona la fecha de pago.");
    const monto = Number(form.monto);
    if (!monto || monto <= 0) return setErr("Ingresa un monto válido (> 0).");
    setErr("");

    onRegistrar({
      socioId: form.socioId,
      socio: socioNombre,
      fecha: form.fecha,
      monto: monto,
      metodo: form.metodo,
    });
    setForm({ socioId: "", fecha: "", monto: "", metodo: "Transferencia" });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <label className="form-label">Socio</label>
          <select className="form-select" name="socioId" value={form.socioId} onChange={onChange}>
            <option value="" disabled>Selecciona socio</option>
            {socios.map(s => <option key={s.id} value={s.id}>{s.nombre}</option>)}
          </select>
        </div>

        <div className="col-12 col-md-6">
          <label className="form-label">Fecha de pago</label>
          <input type="date" className="form-control" name="fecha" value={form.fecha} onChange={onChange} />
        </div>

        <div className="col-12 col-md-6">
          <label className="form-label">Monto</label>
          <div className="input-group">
            <input type="number" className="form-control" name="monto" value={form.monto} onChange={onChange} />
            <span className="input-group-text">CLP</span>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <label className="form-label">Método de pago</label>
          <select className="form-select" name="metodo" value={form.metodo} onChange={onChange}>
            <option>Transferencia</option>
            <option>Efectivo</option>
            <option>Tarjeta</option>
          </select>
        </div>
      </div>

      {err && <div className="text-danger mb-2">{err}</div>}

      <button type="submit" className="btn btn-primary">Registrar Pago</button>
    </form>
  );
}
