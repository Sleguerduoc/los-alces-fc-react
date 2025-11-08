// src/data/jugadores.js
const JUGADORES = [
    {
        id: 1,
        nombre: "Manuel Reyes",
        dorsal: 9,
        posicion: "Delantero",
        categoria: "Masculino",
        edad: 24,
        nacionalidad: "Chile",
        estado: "Activo",
        contratoHasta: "2026-12-31",
        foto: "manuel-reyes.jpg",
        stats: { partidos: 18, goles: 10, asistencias: 3, tarjetasA: 2, tarjetasR: 0 },
    },
    {
        id: 2,
        nombre: "Andrés Soto",
        dorsal: 7,
        posicion: "Volante",
        categoria: "Masculino",
        edad: 25,
        nacionalidad: "Chile",
        estado: "Activo",
        contratoHasta: "2026-12-31",
        foto: "andres-soto.jpg",
        stats: { partidos: 20, goles: 6, asistencias: 8, tarjetasA: 1, tarjetasR: 0 },
    },
    {
        id: 3,
        nombre: "Diego Silva",
        dorsal: 5,
        posicion: "Defensa",
        categoria: "Masculino",
        edad: 27,
        nacionalidad: "Chile",
        estado: "Lesionado",
        contratoHasta: "2025-06-30",
        foto: "diego-silva.jpg",
        stats: { partidos: 15, goles: 1, asistencias: 2, tarjetasA: 4, tarjetasR: 1 },
    },
    {
        id: 4,
        nombre: "Juan Pérez",
        dorsal: 1,
        posicion: "Arquero",
        categoria: "Masculino",
        edad: 23,
        nacionalidad: "Chile",
        estado: "Activo",
        contratoHasta: "2026-06-30",
        foto: "juan-perez.jpg",
        stats: { partidos: 19, goles: 0, asistencias: 0, tarjetasA: 1, tarjetasR: 0 },
    },
    {
        id: 5,
        nombre: "Juan Vega",
        dorsal: 10,
        posicion: "Delantero",
        categoria: "Masculino",
        edad: 28,
        nacionalidad: "Chile",
        estado: "Suspendido",
        contratoHasta: "2025-12-31",
        foto: "juan.webp", // usa el .webp que tienes
        stats: { partidos: 16, goles: 3, asistencias: 5, tarjetasA: 5, tarjetasR: 1 },
    },
    ];

    // Resolver imágenes desde src/assets/img/jugadores
    export function imageForJugador(filename) {
    try {
        return require(`../assets/img/jugadores/${filename}`);
    } catch {
        return require(`../assets/img/jugadores/placeholder.jpg`);
    }
}

export default JUGADORES;
