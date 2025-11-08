import React, { useState } from "react";

export default function SettingsPage() {
    const [form, setForm] = useState({
        passOld: "",
        passNew: "",
        passConfirm: "",
        notificaEmail: true,
    });
    const [touched, setTouched] = useState({});

    const passTooShort = form.passNew && form.passNew.length < 8;
    const passMismatch = form.passNew && form.passConfirm && form.passNew !== form.passConfirm;

    const errors = {
        passOld: !form.passOld ? "Requerido" : "",
        passNew: !form.passNew ? "Requerido" : passTooShort ? "Mínimo 8 caracteres" : "",
        passConfirm: !form.passConfirm ? "Requerido" : passMismatch ? "No coincide" : "",
    };
    const invalid = (f) => touched[f] && errors[f];

    const onChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(p => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    };
    const onBlur = (e) => setTouched(p => ({ ...p, [e.target.name]: true }));

    const onSubmit = (e) => {
        e.preventDefault();
        setTouched({ passOld:true, passNew:true, passConfirm:true });
        if (Object.values(errors).some(Boolean)) return;
        // Aquí llamarías a tu API: POST /users/change-password
        console.log("Guardar configuración:", form);
        alert("Configuración guardada ✅");
        setForm(p => ({ ...p, passOld: "", passNew: "", passConfirm: "" }));
    };

    return (
        <div className="container-md mt-3">
        <div className="card mx-auto" style={{maxWidth: 600}}>
            <div className="card-body">
            <h5 className="card-title mb-4">Configuración de la cuenta</h5>

            <form onSubmit={onSubmit} noValidate>
                <div className="mb-3">
                <label className="form-label">Contraseña actual</label>
                <input
                    type="password"
                    name="passOld"
                    className={`form-control ${invalid("passOld") ? "is-invalid" : ""}`}
                    value={form.passOld}
                    onChange={onChange}
                    onBlur={onBlur}
                    required
                />
                {invalid("passOld") && <div className="invalid-feedback">{errors.passOld}</div>}
                </div>

                <div className="mb-3">
                <label className="form-label">Nueva contraseña</label>
                <input
                    type="password"
                    name="passNew"
                    className={`form-control ${invalid("passNew") ? "is-invalid" : ""}`}
                    value={form.passNew}
                    onChange={onChange}
                    onBlur={onBlur}
                    required
                />
                {invalid("passNew") && <div className="invalid-feedback">{errors.passNew}</div>}
                <div className="form-text">Usa al menos 8 caracteres (recomendado: mayúsculas, minúsculas y números).</div>
                </div>

                <div className="mb-3">
                <label className="form-label">Confirmar nueva contraseña</label>
                <input
                    type="password"
                    name="passConfirm"
                    className={`form-control ${invalid("passConfirm") ? "is-invalid" : ""}`}
                    value={form.passConfirm}
                    onChange={onChange}
                    onBlur={onBlur}
                    required
                />
                {invalid("passConfirm") && <div className="invalid-feedback">{errors.passConfirm}</div>}
                </div>

                <hr />

                <div className="form-check form-switch mb-3">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="switchNotificaciones"
                    name="notificaEmail"
                    checked={form.notificaEmail}
                    onChange={onChange}
                />
                <label className="form-check-label" htmlFor="switchNotificaciones">
                    Recibir notificaciones por correo
                </label>
                </div>

                <button type="submit" className="btn btn-primary">Guardar configuración</button>
            </form>
            </div>
        </div>
        </div>
    );
}
