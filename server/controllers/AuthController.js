import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

/* --- REGISTER --- */
const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const user = await UserModel.findOne({ where: { username: username }});
        if (user) {
            return res.status(400).json({ message: "Ya existe una cuenta con dicho nombre de usuario" });
        }

        const passwordHash = await bcrypt.hash(password, 8);
        
        const newUser = await UserModel.create({
            username: username,
            password: passwordHash,
            admin: false
        });

        if (!newUser) {
            return res.status(400).json({ message: "Error en el registro de usuario" });
        }

        res.status(201).json({ message: "Usuario creado con éxito" });
    }
    catch (err) {
        res.status(500).json({ message: "Server Error", error: err });
    }
}

/* --- LOGIN --- */
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserModel.findOne({ where: { username: username }});

        if (!user) {
            return res.status(404).json({ message: "User not found "});
        }

        const result = await bcrypt.compare(password, user.password);

        if (result) {
            const payload = {
                isAdmin: user.admin
            }

            const token = jwt.sign(
                payload, 
                process.env.SECRET_KEY, 
                {
                    expiresIn: "1h"
                }
            );

            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: 3600000, // 1 h
            });

            return res.status(200).json({ 
                message: `Inicio de sesión correcta`,
                isAdmin: user.admin,
            });
        }
        else {
            return res.status(401).json({ message: "Inicio de sesión incorrecto" });
        }
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

/* --- LOGOUT --- */
const logout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        return res.status(200).json({ message:"Cierre de sesión exitoso" });
    }
    catch (err) {
        res.status(500).json({ 
            message: "Error en el cierre de sesión",
            error: err.message
        });
    }
}

export default {
    login,
    register,
    logout
}
