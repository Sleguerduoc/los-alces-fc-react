
const PRODUCTS = [
    { id:"CAM-2025-H", name:"Camiseta Titular 2025", category:"Camisetas", price:29990, oldPrice:34990, stock:12, img:"camiseta_titular.jpg", tags:["unisex","oficial","2025"] },
    { id:"CAM-2025-A", name:"Camiseta Alterna 2025", category:"Camisetas", price:29990, oldPrice:null,   stock:0,  img:"camiseta_alterna.jpg", tags:["unisex","oficial","2025"] },
    { id:"BOT-ALU-750", name:"Botella Metálica 750ml", category:"Accesorios", price:14990, oldPrice:17990, stock:25, img:"botella_metalica.jpg", tags:["gym","hidratación"] },
    { id:"GOR-TEJ", name:"Gorro Tejido", category:"Accesorios", price:9990,  oldPrice:null,   stock:8,  img:"gorro_tejido.jpg",  tags:["invierno"] },
    { id:"TAZ-LOGO", name:"Taza Logo Los Alces", category:"Hogar", price:6990, oldPrice:8990, stock:40, img:"taza_logo.jpg", tags:["oficial","regalo"] },
    { id:"BUF-2025", name:"Bufanda Oficial", category:"Accesorios", price:11990, oldPrice:null, stock:16, img:"bufanda.jpg", tags:["estadio","invierno"] },
    ];


    export function imageFor(filename) {
    try {
        return require(`../assets/img/merch/${filename}`);
    } catch {
        return require(`../assets/img/merch/placeholder.jpg`);
    }
}

export default PRODUCTS;
