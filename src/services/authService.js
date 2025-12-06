
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

export async function loginRequest(email, password) {
    const resp = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!resp.ok) {
        let msg = "Error al iniciar sesión";
        try {
        const data = await resp.json();
        if (data && data.mensaje) msg = data.mensaje;
        } catch {
        // ignorar
        }
        throw new Error(msg);
    }

    const data = await resp.json();
  return data.user; // { id, nombre, email, rol }
}
