import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const adminRequired = (req, res, next) => {
    const token = req.cookies["jwt"];

    if (!token) {
        return res.status(401).json({ 
            message:"No se ha proporcionado un token de acceso." 
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded.isAdmin) {
            return res.status(403).json({ 
                message: "No se tiene los permisos necesarios para realizar la operación." 
            });
        }
        next();
    }
    catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "El token de acceso ha expirado." });
        }
        else if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Token de acceso inválido." });
        }
        else {
            return res.status(500).json({ message: "Error en la autenticación." });
        }
    }
}

export default adminRequired;
