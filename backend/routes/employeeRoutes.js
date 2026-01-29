import express from "express";
import {
  applyLeave,
  myLeaves,
  updateLeave,
  deleteLeave,
  listEmployees
} from "../controllers/employeeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/apply", protect, applyLeave);
router.get("/my-leaves", protect, myLeaves);
router.put("/update/:id", protect, updateLeave);
router.delete("/delete/:id", protect, deleteLeave);


router.get("/list", protect, listEmployees);

export default router;
