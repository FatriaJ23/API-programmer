import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { getBalance, topUp, makeTransaction } from "../services/balanceServices.js";

const router = express.Router();

router.get("/balance", verifyToken, getBalance);
router.post("/topup", verifyToken, topUp);
router.post("/transaction", verifyToken, makeTransaction);

export default router;
