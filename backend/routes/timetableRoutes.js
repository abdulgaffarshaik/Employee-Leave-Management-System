import express from "express";
import {
  createTimetable,
  getAllTimetables,
  getTimetable,
  updateTimetable,
  deleteTimetable,
  getTimetableByClassSection
} from "../controllers/timetableController.js";

import { protect } from "../middleware/authMiddleware.js";
import { isManager, isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Manager routes: Create, Update, Delete timetables
router.post("/", protect, isManager, createTimetable);
router.get("/", protect, getAllTimetables);
router.get("/:id", protect, getTimetable);
router.put("/:id", protect, isManager, updateTimetable);
router.delete("/:id", protect, isManager, deleteTimetable);

// Public route: Employees can view timetable by class/section
router.get("/view/:class/:section", getTimetableByClassSection);

export default router;
