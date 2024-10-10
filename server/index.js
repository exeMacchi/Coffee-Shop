import express from "express";
import cors from "cors";
import db from "./database/db.js";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
config();

// Enrutadores
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// Middlewares
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

// Middlewares rutas
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// Middleware Health Check
app.use("/health", async (req, res) => {
    try {
        await db.authenticate();
        res.status(200).json({
            status: "UP",
            database: "Connected"
        });
    }
    catch (err) {
        res.status(500).json({
            status: "DOWN",
            database: "Disconnected",
            error: err.message
        });
    }
});


app.listen(process.env.SERVER_PORT, async () => {
    console.log(`Servidor escuchando por el puerto ${process.env.SERVER_PORT}`);
    
    // Verificación de la base de datos.
    try {
        await db.authenticate();
        console.log("Conexión existosa con la base de datos");
    }
    catch (err) {
        console.error(`Error de conexión con la base de datos: ${err.message}`);
    }
});
