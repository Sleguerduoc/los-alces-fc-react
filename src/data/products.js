

export function imageFor(filename) {
    try {
        return require(`../assets/img/merch/${filename}`);
    } catch {
        return require(`../assets/img/merch/placeholder.jpg`);
    }
}


const PRODUCTS = [];
export default PRODUCTS;
