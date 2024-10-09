import express from "express";
import productController from "../controllers/ProductController.js";

// MIDDLEWARES
import upload from "../middlewares/multer.js";
import adminRequired from "../middlewares/adminRequired.js";

const router = express.Router();

/* --- READ --- */
router.get("/test", adminRequired, async (req, res) => {
    res.status(200).json({message: "OK"});
});
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProduct);


/* --- CREATE --- */
router.post(
    "/create",
    adminRequired,
    (req, res, next) => {
        upload.single("productImage")(req, res, (err) => {
            if (err) {
                if (err.message === "Tipo de archivo no permitido") {
                    return res.status(400).json({ 
                        errorMessage: "Solo se permiten archivos de imagen." 
                    });
                }
                return res.status(500).json({ 
                    errorMessage: "Error al subir el archivo." 
                });
            }
            productController.createProduct(req, res);
        });
    }
);

/* --- UPDATE --- */
router.put(
    "/edit/:id",
    adminRequired,
    (req, res, next) => {
        upload.single("productImage")(req, res, (err) => {
            if (err) {
                if (err.message === "Tipo de archivo no permitido") {
                    return res.status(400).json({ 
                        errorMessage: "Solo se permiten archivos de imagen." 
                    });
                }
                return res.status(500).json({ 
                    errorMessage: "Error al subir el archivo." 
                });
            }
            productController.editProduct(req, res);
        });
    }
);

/* --- DELETE --- */
router.delete("/delete/:id", adminRequired, productController.deleteProduct);


export default router;
