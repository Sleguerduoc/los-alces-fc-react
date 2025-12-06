
const images = require.context("../assets/img/jugadores", false, /\.(png|jpe?g|svg)$/);

export function getPlayerImage(nombreArchivo) {
    if (!nombreArchivo) {
        return images("./placeholder.jpg");
    }

    try {
        return images(`./${nombreArchivo}`);
    } catch {
        return images("./placeholder.jpg");
    }
}
