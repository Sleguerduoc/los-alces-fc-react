const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

export async function getStaff() {
    const res = await fetch(`${API_URL}/staff`);
    if (!res.ok) throw new Error("Error al obtener staff");
    return await res.json();
    }

export async function createStaff(data) {
    const payload = {
        ...data,
        sueldo: data.sueldo ? Number(data.sueldo) : 0,
        valorHora: data.valorHora ? Number(data.valorHora) : 0,
        horas: data.horas ? Number(data.horas) : 0,
    };

    const res = await fetch(`${API_URL}/staff`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        let body = {};
        try {
        body = await res.json();
        } catch {}
        throw new Error(body.mensaje || "Error al crear staff");
    }

    return await res.json();
}

export async function updateStaffById(id, data) {
    const payload = {
        ...data,
        sueldo: data.sueldo ? Number(data.sueldo) : 0,
        valorHora: data.valorHora ? Number(data.valorHora) : 0,
        horas: data.horas ? Number(data.horas) : 0,
    };

    const res = await fetch(`${API_URL}/staff/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        let body = {};
        try {
        body = await res.json();
        } catch {}
        throw new Error(body.mensaje || "Error al actualizar staff");
    }

    return await res.json();
}

export async function deleteStaffById(id) {
    const res = await fetch(`${API_URL}/staff/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        let body = {};
        try {
        body = await res.json();
        } catch {}
        throw new Error(body.mensaje || "Error al eliminar staff");
    }

    return await res.json();
}
