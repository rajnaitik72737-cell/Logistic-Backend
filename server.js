import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import shipmentRoutes from "./routes/shipmentRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ------------------ MIDDLEWARE ------------------
app.use(cors({
  origin: "*", // dev only
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// ------------------ ROUTES ------------------
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/users", userRoutes);
app.use("/api/shipments", shipmentRoutes);

// Test route
app.get("/api/test", (req, res) => {
  res.json({ success: true, message: "Backend is working!" });
});

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ------------------ ERROR HANDLER ------------------
app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: err.message
  });
});

// ------------------ START SERVER ------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});