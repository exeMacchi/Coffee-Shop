import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const adminRequired = (req, res, next) => {
    //const token = req.header("authorization");
    const token = res.cookies["JWT"];

    if (!token) {
        return res.status(401).json({ 
            message:"Acceso denegado. No se ha proporcionado un token de acceso" 
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded.isAdmin) {
            return res.status(403).json({ 
                message: "Acceso denegado. No se tiene los permisos de administrador" 
            });
        }
        next();
    }
    catch (err) {
        res.status(401).json({ message: "Token de acceso inválido" });
    }
}

export default adminRequired;
