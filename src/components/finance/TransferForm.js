import React, { useMemo, useState } from "react";

const jugadores = ["Manuel Reyes", "Andrés Soto", "Juan Pérez"];
const clubes = ["Club A", "Club B"];

export default function TransferForm({ onCreate }) {
  const [form, setForm] = useState({
    jugador: "", club: "", fecha: "", monto: ""
  });
  const [err, setErr] = useState("");

  const split = useMemo(() => {
    const m = Number(form.monto || 0);
    const base = m > 0 ? m : 0;
    return {
      club: Math.round(base * 0.5),
      bio: Math.round(base * 0.25),
      anfa: Math.round(base * 0.25),
    };
  }, [form.monto]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    if (!form.jugador) return setErr("Por favor selecciona un jugador.");
    if (!form.club) return setErr("Por favor selecciona un club destino.");
    if (!form.fecha) return setErr("Por favor selecciona la fecha de venta.");
    const monto = Number(form.monto);
    if (!monto || monto <= 0) return setErr("Ingresa un monto válido (> 0).");

    setErr("");
    
    onCreate({
      fecha: form.fecha,
      desc: `Venta ${form.jugador} a ${form.club} (50/25/25)`,
      monto: monto,
    });
    alert("Venta registrada");
    setForm({ jugador: "", club: "", fecha: "", monto: "" });
  };

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">Traspasos</h5>
        <button className="btn btn-accent btn-sm" onClick={onSubmit}>Registrar Venta</button>
      </div>
      <div className="card-body">
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Selecciona el jugador</label>
            <select className="form-select" name="jugador" value={form.jugador} onChange={onChange}>
              <option value="" disabled>Elige jugador</option>
              {jugadores.map((j) => <option key={j}>{j}</option>)}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Club destino</label>
            <select className="form-select" name="club" value={form.club} onChange={onChange}>
              <option value="" disabled>Elige club</option>
              {clubes.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Fecha de venta</label>
            <input type="date" className="form-control" name="fecha" value={form.fecha} onChange={onChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Monto de venta</label>
            <div className="input-group">
              <input type="number" className="form-control" name="monto" placeholder="0" value={form.monto} onChange={onChange}/>
              <span className="input-group-text">CLP</span>
            </div>
          </div>

          <ul className="list-group list-group-flush mb-3">
            <li className="list-group-item d-flex justify-content-between">
              <span>50% para el club</span><span>CLP {split.club.toLocaleString("es-CL")}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>25% Asoc. Bío Bío</span><span>CLP {split.bio.toLocaleString("es-CL")}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>25% ANFA</span><span>CLP {split.anfa.toLocaleString("es-CL")}</span>
            </li>
          </ul>

          {err && <div className="text-danger">{err}</div>}
        </form>
      </div>
    </div>
  );
}
