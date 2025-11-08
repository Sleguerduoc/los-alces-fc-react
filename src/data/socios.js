const SOCIOS = [
    {
        id: 1,
        nombre: "Manuel Reyes",
        rut: "11.111.111-1",
        estado: "Activo",
        email: "manuel@alces.cl",
        telefono: "+56 9 1234 5678",
        direccion: "Av. Siempre Viva 123, Coronel",
        fechaIngreso: "2024-03-01",
        foto: "placeholder.jpg", 
    },
    {
        id: 2,
        nombre: "Andrés Soto",
        rut: "12.222.222-2",
        estado: "Inactivo",
        email: "andres@alces.cl",
        telefono: "+56 9 9876 5432",
        direccion: "Calle 456, Concepción",
        fechaIngreso: "2024-04-15",
        foto: "placeholder.jpg", 
    },
    ];


    export function imageForSocio(filename) {
    try {
        return require(`../assets/img/socios/${filename}`);
    } catch {
        return require(`../assets/img/socios/placeholder.jpg`);
    }
}

export default SOCIOS;
