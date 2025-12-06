
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

function mapEstadoToApi(estadoUi) {
  if (!estadoUi) return undefined;
  const lower = estadoUi.toLowerCase();
  
  if (["activo", "inactivo", "moroso"].includes(lower)) return lower;
  return lower;
}


export async function getSocios() {
  const res = await fetch(`${API_URL}/socios`);
  if (!res.ok) throw new Error("Error al obtener socios");
  return await res.json();
}


export async function getSocioByRut(rut) {
  const res = await fetch(`${API_URL}/socios/rut/${encodeURIComponent(rut)}`);
  if (!res.ok) throw new Error("Socio no encontrado");
  return await res.json();
}


export async function createSocio(data) {
  const payload = {
    ...data,
    estado: mapEstadoToApi(data.estado),
  };

  const res = await fetch(`${API_URL}/socios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let body = {};
    try { body = await res.json(); } catch {}
    throw new Error(body.mensaje || "Error al crear socio");
  }

  return await res.json();
}


export async function updateSocioById(id, data) {
  const payload = {
    ...data,
    estado: mapEstadoToApi(data.estado),
  };

  const res = await fetch(`${API_URL}/socios/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let body = {};
    try { body = await res.json(); } catch {}
    throw new Error(body.mensaje || "Error al actualizar socio");
  }

  return await res.json();
}


export async function deleteSocioById(id) {
  const res = await fetch(`${API_URL}/socios/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    let body = {};
    try { body = await res.json(); } catch {}
    throw new Error(body.mensaje || "Error al eliminar socio");
  }

  return await res.json();
}
