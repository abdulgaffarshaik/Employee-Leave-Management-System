import express from "express";
import { applyLeave, myLeaves, updateLeave, deleteLeave} from "../controllers/employeeController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isEmployee } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/apply", protect, isEmployee, applyLeave);
router.get("/my-leaves", protect, isEmployee, myLeaves);
router.put("/update/:id", protect, isEmployee, updateLeave);
router.delete("/delete/:id", protect, isEmployee, deleteLeave);


export default router;
