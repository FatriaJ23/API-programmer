import express from "express";
import cors from "cors";
import { swaggerUi, swaggerSpec } from "./config/swagger.js";
import authRoute from "./api/authApi.js";
import balanceRoute from "./api/balanceApi.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import "dotenv/config";

const app = express();

// Konfigurasi CORS agar Swagger & frontend bisa akses API
app.use(cors({
  origin: "*", // izinkan semua domain (bisa juga diganti dengan domain frontend kamu)
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Middleware bawaan Express
app.use(express.json());

// Root route → redirect ke Swagger UI
app.get("/", (req, res) => res.redirect("/api-docs"));

// Swagger documentation route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes
app.use("/api", authRoute);
app.use("/api", balanceRoute);

// Error handling middleware
app.use(errorHandler);

// Gunakan port dari environment Railway
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
