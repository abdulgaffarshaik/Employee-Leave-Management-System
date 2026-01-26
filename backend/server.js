import express from "express";
import cors from "cors";
import loadEnv from "./config/env.js";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import managerRoutes from "./routes/managerRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

// Load Environment Variables
loadEnv();

// Connect Database
connectDB();

const app = express();

// Middlewares
app.use(cors()); // ⭐ THIS IS THE FIX
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/manager", managerRoutes);
app.use("/api/admin", adminRoutes);

// Health Check
app.get("/", (req, res) => {
  res.send("Employee Leave Management System API Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
