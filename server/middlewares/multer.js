import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Las imágenes se guardan en el volumen montado de Docker
        cb(null, "/usr/src/app/productImages");
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ 
    storage, 
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        }
        else {
            cb(new Error("Tipo de archivo no permitido"), false);
        }
    }
});

export default upload
