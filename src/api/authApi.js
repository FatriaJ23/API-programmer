import express from "express";
import { register, login } from "../services/authServices.js";

const router = express.Router();

// Register
router.post("/registration", register);

// Login
router.post("/login", login);

export default router;
