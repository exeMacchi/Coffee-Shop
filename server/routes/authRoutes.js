import express from "express";
import AuthController from "../controllers/AuthController.js";

const router = express.Router();

router.get("/logout", AuthController.logout);
router.post("/register", AuthController.register)
router.post("/login", AuthController.login);

export default router;
