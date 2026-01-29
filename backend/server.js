import express from "express";
import cors from "cors";
import loadEnv from "./config/env.js";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import managerRoutes from "./routes/managerRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import loggerMiddleware from "./middleware/loggerMiddleware.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import { monthlyLeaveReset } from "./utils/leaveCron.js";

// Load Environment Variables
loadEnv();

// Connect Database
connectDB();

monthlyLeaveReset();

const app = express();

// Middlewares
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/manager", managerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notification", notificationRoutes);


app.get("/", (req, res) => {
  res.send("Employee Leave Management System API Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
