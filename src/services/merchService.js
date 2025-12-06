
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

const mapProductFromApi = (p) => ({
    id: p._id,
    name: p.name,
    category: p.category,
    price: p.price,
    oldPrice: p.oldPrice ?? null,
    stock: p.stock ?? 0,
    img: p.img || "",
    tags: Array.isArray(p.tags) ? p.tags : [],
    });


export async function getProductosMerch() {
    const resp = await fetch(`${API_URL}/merch`);

    if (!resp.ok) {
        let mensaje = "Error al obtener productos de merch";
        try {
        const body = await resp.json();
        if (body && body.mensaje) mensaje = body.mensaje;
        } catch {
            // No hacer nada
        }
        throw new Error(mensaje);
    }

    const data = await resp.json();
    return data.map(mapProductFromApi);
}
