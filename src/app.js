import express from "express";
import cors from "cors";
import authRoute from "./services/authServices.js";
import balanceRoute from "./services/balanceServices.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", authRoute);
app.use("/api", balanceRoute);

//error handling
app.use(errorHandler);

// Gunakan port langsung (tanpa .env)
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});






