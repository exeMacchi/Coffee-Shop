import ProductModel from "../models/ProductModel.js";
import deleteProductImage from "../utilities/deleteProductImage.js";

/* --- READ --- */
const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.findAll();
        res.status(200).json(products);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getProduct = async (req, res) => {
    try {
        const product = await ProductModel.findOne({ where: { id: req.params.id } });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

/* --- CREATE --- */
const createProduct = async (req, res) => {
    try {
        // Imagen de producto
        let productImage;
        if (req.file) {
            productImage = `/productImages/${req.file.filename}`;
        }
        else {
            productImage = "/productImages/productPlaceholder.jpg";
        }

        const newProduct = await ProductModel.create({
            name: req.body.productName,
            description: req.body.productDescription,
            price: req.body.productPrice,
            image: productImage
        });

        if (!newProduct) {
            if (req.file) {
                // Se elimina automáticamente la imagen subida ante un error.
                await deleteProductImage(`/usr/src/app/productImages/${req.file.filename}`);
            }
            return res.status(400).json({ message: "Error en la creación del producto" });
        }

        res.status(201).json({ message: "Producto creado con éxito" });
    }
    catch (err) {
        if (req.file) {
            // Se elimina automáticamente la imagen subida ante un error.
            await deleteProductImage(`/usr/src/app/productImages/${req.file.filename}`);
        }
        res.status(500).json({ message: err.message });
    }
}

/* --- UPDATE --- */
const editProduct = async (req, res) => {
    try {
        /* --- Imagen del producto --- */
        let productImage;
        // Si se modifica la imagen del producto, se guarda la nueva referencia.
        if (req.file) {
            productImage = `/productImages/${req.file.filename}`;
        }
        // Si no se modifica la imagen del producto, se guarda la referencia actual.
        else {
            productImage = req.body.productPrevImage;
        }

        /* --- Actualizar el producto --- */
        await ProductModel.update({
            name: req.body.productName,
            description: req.body.productDescription,
            price: req.body.productPrice,
            image: productImage
        }, {
            where: { id: req.params.id }
        });

        // Si se modificó con éxito el producto, se borra la referencia de la imagen antigua.
        if (req.file) {
            await deleteProductImage(`/usr/src/app${req.body.productPrevImage}`);
        }

        res.status(200).json({ message: "Producto modificado con éxito" });
    }
    catch (err) {
        // Si se subió una imagen...
        if (req.file) {
            // y hubo un error, se borra automáticamente la imagen subida.
            await deleteProductImage(`/usr/src/app/productImages/${req.file.filename}`);
        }
        res.status(500).json({ message: err.message });
    }
}

/* --- DELETE --- */
const deleteProduct = async (req, res) => {
    try {
        const productID = req.params.id
        const rowsDeleted = await ProductModel.destroy({ where: { id: productID }});

        // Si se eliminó el producto de forma exitosa
        if (rowsDeleted > 0) {
            // Se verifica si se tiene que eliminar una imagen local del producto eliminado.
            const productImage = req.body.productImage;
            if (!productImage.endsWith("productPlaceholder.jpg")) {
                await deleteProductImage(`/usr/src/app${productImage}`);
            }

            return res.status(204).json({ message: "Producto eliminado con éxito "});
        }
        else {
            return res.status(400).json({ message: "No se pudo eliminar el producto especificado" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}

export default {
    getAllProducts,
    getProduct,
    createProduct,
    editProduct,
    deleteProduct
};
