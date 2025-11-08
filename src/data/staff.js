const STAFF = [
    {
        id: 1,
        nombre: "Erik González",
        cargo: "Entrenador",
        horas: 120,
        foto: "erik.png",
        sueldo: 0,
        extra: 0,
        obs: "",
    },
    {
        id: 2,
        nombre: "Roberto",
        cargo: "Asistente",
        horas: 90,
        foto: "roberto.png",
        sueldo: 0,
        extra: 0,
        obs: "",
    },
    {
        id: 3,
        nombre: "Laura Sánchez",
        cargo: "Fisioterapeuta",
        horas: 74,
        foto: "laura.jpg",
        sueldo: 0,
        extra: 0,
        obs: "",
    },
    {
        id: 4,
        nombre: "Cristian Pérez",
        cargo: "Preparador físico",
        horas: 85,
        foto: "cristian.png",
        sueldo: 0,
        extra: 0,
        obs: "",
    },
];

// Resolver imágenes desde src/assets/img/staff
export function imageForStaff(filename) {
    try {
        return require(`../assets/img/staff/${filename}`);
    } catch {
        return require(`../assets/img/staff/placeholder.jpg`);
    }
}

export default STAFF;
