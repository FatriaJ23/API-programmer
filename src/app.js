import express from "express";
import cors from "cors";
import { swaggerUi, swaggerSpec } from "./config/swagger.js";
import authRoute from "./api/authApi.js";
import balanceRoute from "./api/balanceApi.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import "dotenv/config";

const app = express();

// Konfigurasi CORS
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Middleware
app.use(express.json());

// RootSwagger UI
app.get("/", (req, res) => res.redirect("/api-docs"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes
app.use("/api", authRoute);
app.use("/api", balanceRoute);

// Error handling 
app.use(errorHandler);

// port Railway
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
