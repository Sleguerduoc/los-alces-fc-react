const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";


export async function getJugadores() {
    const res = await fetch(`${API_URL}/jugadores`);
    if (!res.ok) throw new Error("Error al obtener jugadores");
    return await res.json();
}


export async function createJugador(data) {
    const payload = {
        ...data,
        numeroCamiseta: data.numeroCamiseta ? Number(data.numeroCamiseta) : 0,
        partidos: data.partidos ? Number(data.partidos) : 0,
        goles: data.goles ? Number(data.goles) : 0,
        asistencias: data.asistencias ? Number(data.asistencias) : 0,
    };

    const res = await fetch(`${API_URL}/jugadores`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        let body = {};
        try { body = await res.json(); } catch {}
        throw new Error(body.mensaje || "Error al crear jugador");
    }

    return await res.json();
}


export async function updateJugadorById(id, data) {
    const payload = {
        ...data,
        numeroCamiseta: data.numeroCamiseta ? Number(data.numeroCamiseta) : 0,
        partidos: data.partidos ? Number(data.partidos) : 0,
        goles: data.goles ? Number(data.goles) : 0,
        asistencias: data.asistencias ? Number(data.asistencias) : 0,
    };

    const res = await fetch(`${API_URL}/jugadores/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        let body = {};
        try { body = await res.json(); } catch {}
        throw new Error(body.mensaje || "Error al actualizar jugador");
    }

    return await res.json();
}


export async function deleteJugadorById(id) {
    const res = await fetch(`${API_URL}/jugadores/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        let body = {};
        try { body = await res.json(); } catch {}
        throw new Error(body.mensaje || "Error al eliminar jugador");
    }

    return await res.json();
}
