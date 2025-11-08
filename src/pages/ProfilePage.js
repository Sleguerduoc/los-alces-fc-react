import React, { useState } from "react";

export default function ProfilePage() {
    const [form, setForm] = useState({
        nombre: "Juan Pérez",
        email: "juan.perez@alces.cl",
        telefono: "+56 9 1234 5678",
    });
    const [touched, setTouched] = useState({});

    const errors = {
        nombre: form.nombre.trim().length < 3 ? "Nombre muy corto" : "",
        email: !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email) ? "Correo inválido" : "",
        telefono: form.telefono && !/^\+?\d[\d\s-]{7,}$/.test(form.telefono) ? "Teléfono inválido" : "",
    };
    const invalid = (f) => touched[f] && errors[f];
    const onChange = (e) => {
        const { name, value } = e.target;
        setForm(p => ({ ...p, [name]: value }));
    };
    const onBlur = (e) => setTouched(p => ({ ...p, [e.target.name]: true }));
    const onSubmit = (e) => {
        e.preventDefault();
        setTouched({ nombre:true, email:true, telefono:true });
        if (Object.values(errors).some(Boolean)) return;
        // Aquí iría tu llamada a API para actualizar perfil
        console.log("Actualizar perfil", form);
        alert("Perfil actualizado ✅");
    };

    return (
        <div className="container-md mt-3">
        <div className="card mx-auto" style={{maxWidth: 600}}>
            <div className="card-body">
            <h5 className="card-title mb-4">Mi Perfil</h5>
            <form onSubmit={onSubmit} noValidate>
                <div className="mb-3">
                <label className="form-label">Nombre completo</label>
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

                <div className="mb-3">
                <label className="form-label">Correo electrónico</label>
                <input
                    type="email"
                    name="email"
                    className={`form-control ${invalid("email") ? "is-invalid" : ""}`}
                    value={form.email}
                    onChange={onChange}
                    onBlur={onBlur}
                    required
                />
                {invalid("email") && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="mb-3">
                <label className="form-label">Teléfono</label>
                <input
                    type="tel"
                    name="telefono"
                    className={`form-control ${invalid("telefono") ? "is-invalid" : ""}`}
                    value={form.telefono}
                    onChange={onChange}
                    onBlur={onBlur}
                />
                {invalid("telefono") && <div className="invalid-feedback">{errors.telefono}</div>}
                </div>

                <button type="submit" className="btn btn-primary">Guardar cambios</button>
            </form>
            </div>
        </div>
        </div>
    );
}
