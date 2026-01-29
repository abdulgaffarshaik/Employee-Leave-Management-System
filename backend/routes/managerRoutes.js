import express from "express";
import {
  getAllLeaves,
  approveLeave,
  rejectLeave
} from "../controllers/managerController.js";

import { protect } from "../middleware/authMiddleware.js";
import { isManager } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/leaves", protect, isManager, getAllLeaves);
router.put("/approve/:id", protect, isManager, approveLeave);
router.put("/reject/:id", protect, isManager, rejectLeave);

export default router;
