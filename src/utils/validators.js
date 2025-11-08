export const limpiar = (str) => (str || "").toString().trim();

// ── Nombre ──
export const validarNombre = (v) => limpiar(v).length >= 3;

// ── RUT (guion obligatorio, puntos opcionales) ──
export const normalizarRut = (rut) => limpiar(rut).replace(/\./g, "").toUpperCase();
export const rutValido = (rut) => {
    rut = normalizarRut(rut);
    if (!/^\d{7,8}-[\dK]$/.test(rut)) return false;
    const [num, dv] = rut.split("-");
    let suma = 0, m = 2;
    for (let i = num.length - 1; i >= 0; i--) {
        suma += parseInt(num[i], 10) * m;
        m = m === 7 ? 2 : m + 1;
    }
    const res = 11 - (suma % 11);
    const dvCalc = res === 11 ? "0" : res === 10 ? "K" : String(res);
    return dvCalc === dv;
    };


export const formatRut = (rut) => {
    let r = normalizarRut(rut);
    if (!r) return "";
    const dv = r.slice(-1);
    let cuerpo = r.slice(0, -1);
    let out = "";
    while (cuerpo.length > 3) {
        out = "." + cuerpo.slice(-3) + out;
        cuerpo = cuerpo.slice(0, -3);
    }
    return `${cuerpo}${out}-${dv}`;
};


export const emailValido = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(limpiar(v));
export const telValido = (v) => {
    const s = limpiar(v).replace(/\D/g, "");
    return s.length >= 8 && s.length <= 12;
    };


export const numeroPositivo = (v) => {
    const n = Number(v);
    return Number.isFinite(n) && n > 0;
    };
export const numeroNoNegativo = (v) => {
    const n = Number(v);
    return Number.isFinite(n) && n >= 0;
    };

// ── Fecha ──
export const fechaNoFutura = (v) => {
    if (!v) return false;
    const hoy = new Date(); hoy.setHours(0,0,0,0);
    const f = new Date(v);  f.setHours(0,0,0,0);
    return f <= hoy;
    };


export const maxLen = (v, n) => limpiar(v).length <= n;
