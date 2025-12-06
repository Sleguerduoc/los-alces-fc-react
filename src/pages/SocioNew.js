import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createJugador } from "../services/jugadoresService";

export default function PlayerNew() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    rut: "",
    fechaNacimiento: "",
    telefono: "",
    posicion: "",
    numeroCamiseta: "",
    estado: "Activo",
    partidos: 0,
    goles: 0,
    asistencias: 0,
    estadoFisico: "Bueno",
    contratoHasta: "",
    comentarios: "",
    foto: "",

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createJugador(form);
      alert(`Jugador "${form.nombre}" registrado con éxito`);
      nav("/jugadores");
    } catch (error) {
      console.error(error);
      alert(error.message || "Error al registrar jugador");
    }
  };

  return (
    
    <div className="container-md py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="m-0">Registrar Nuevo Jugador</h2>
        <button className="btn btn-secondary" onClick={() => nav("/jugadores")}>
          <i className="fas fa-arrow-left me-2"></i>Volver a Jugadores
        </button>
      </div>
      <div className="col-12 col-md-6">
  <label className="form-label">Nombre de archivo de foto</label>
        <input
          type="text"
          name="foto"
          className="form-control"
          placeholder="ej: araya.png"
          value={form.foto}
          onChange={handleChange}
        />
      </div>


      <div className="card">
        <div className="card-body">
          <form className="row g-3" onSubmit={handleSubmit}>
            {/* Datos Personales */}
            <div className="col-12">
              <h5 className="mb-3 border-bottom pb-2">Datos Personales</h5>
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label">Nombre completo</label>
              <input
                type="text"
                name="nombre"
                className="form-control"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label">RUT</label>
              <input
                type="text"
                name="rut"
                className="form-control"
                placeholder="11.111.111-1"
                value={form.rut}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label">Fecha de nacimiento</label>
              <input
                type="date"
                name="fechaNacimiento"
                className="form-control"
                value={form.fechaNacimiento}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label">Teléfono</label>
              <input
                type="tel"
                name="telefono"
                className="form-control"
                placeholder="+56 9 0000 0000"
                value={form.telefono}
                onChange={handleChange}
              />
            </div>

            {/* Información Deportiva */}
            <div className="col-12 mt-4">
              <h5 className="mb-3 border-bottom pb-2">Información Deportiva</h5>
            </div>

            <div className="col-12 col-md-4">
              <label className="form-label">Posición</label>
              <select
                name="posicion"
                className="form-select"
                value={form.posicion}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar...</option>
                <option>Arquero</option>
                <option>Defensa</option>
                <option>Volante</option>
                <option>Delantero</option>
              </select>
            </div>

            <div className="col-12 col-md-4">
              <label className="form-label">Número de camiseta</label>
              <input
                type="number"
                name="numeroCamiseta"
                className="form-control"
                min="1"
                max="99"
                value={form.numeroCamiseta}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-md-4">
              <label className="form-label">Estado</label>
              <select
                name="estado"
                className="form-select"
                value={form.estado}
                onChange={handleChange}
              >
                <option>Activo</option>
                <option>Lesionado</option>
                <option>Inactivo</option>
                <option>Suspendido</option>
              </select>
            </div>

            <div className="col-12 col-md-4">
              <label className="form-label">Partidos jugados</label>
              <input
                type="number"
                name="partidos"
                className="form-control"
                min="0"
                value={form.partidos}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-md-4">
              <label className="form-label">Goles</label>
              <input
                type="number"
                name="goles"
                className="form-control"
                min="0"
                value={form.goles}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-md-4">
              <label className="form-label">Asistencias</label>
              <input
                type="number"
                name="asistencias"
                className="form-control"
                min="0"
                value={form.asistencias}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label">Estado físico</label>
              <select
                name="estadoFisico"
                className="form-select"
                value={form.estadoFisico}
                onChange={handleChange}
              >
                <option>Bueno</option>
                <option>Lesionado</option>
                <option>Recuperación</option>
              </select>
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label">Contrato hasta</label>
              <input
                type="date"
                name="contratoHasta"
                className="form-control"
                value={form.contratoHasta}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <label className="form-label">Comentarios</label>
              <textarea
                name="comentarios"
                className="form-control"
                rows="3"
                placeholder="Observaciones deportivas..."
                value={form.comentarios}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 mt-4">
              <button type="submit" className="btn btn-primary">
                <i className="fas fa-save me-2"></i>Guardar Jugador
              </button>
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => nav("/jugadores")}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
