import { unlink } from "node:fs/promises"

/**
 * Eliminar una imagen de producto
 * @param {string} productImagePath - Ruta completa donde está localizada la imagen (volumen montado)
 */
export default async function deleteProductImage(productImagePath) {
    try {
        await unlink(productImagePath)
        console.log("Imagen de producto eliminado con éxito");
    }
    catch (err) {
        console.error(`Error al intentar eliminar la imagen de producto: ${err.message}`);
    }
}
