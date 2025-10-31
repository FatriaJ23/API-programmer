import express from "express";
import cors from "cors";
import { swaggerUi, swaggerSpec } from "./config/swagger.js";
import authRoute from "./api/authApi.js";
import balanceRoute from "./api/balanceApi.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import "dotenv/config";


const app = express();
app.use(cors());
app.use(express.json());

// Root route → redirect to Swagger
app.get("/", (req, res) => res.redirect("/api-docs"));

// Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Routes
app.use("/api", authRoute);
app.use("/api", balanceRoute);

//error handling
app.use(errorHandler);

// Gunakan port langsung (tanpa .env)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});






