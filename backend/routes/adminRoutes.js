import express from "express";
import { getAllUsers, getAllLeaves, downloadCSV } from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/users", protect, isAdmin, getAllUsers);
router.get("/leaves", protect, isAdmin, getAllLeaves);
router.get("/report/csv", protect, isAdmin, downloadCSV);

export default router;
