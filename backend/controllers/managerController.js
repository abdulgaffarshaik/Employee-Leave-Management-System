import Leave from "../models/Leave.js";
import Notification from "../models/Notification.js";

/* =======================
   GET ALL LEAVES
======================= */
export const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate("employee", "name employeeId leaveBalance usedLeavesThisMonth")
      .populate("replacementEmployee", "name employeeId")
      .sort({ createdAt: -1 });

    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch leaves" });
  }
};

/* =======================
   APPROVE LEAVE
======================= */
export const approveLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id).populate("employee");

    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    if (leave.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Leave already processed" });
    }

    // ✅ Calculate leave days
    const days =
      (leave.toDate - leave.fromDate) / (1000 * 60 * 60 * 24) + 1;

    // ✅ Deduct balance ONLY here
    leave.employee.leaveBalance -= days;
    leave.employee.usedLeavesThisMonth += days;
    await leave.employee.save();

    // ✅ Update leave status
    leave.status = "approved";
    await leave.save();

    // 🔔 Notify employee
    await Notification.create({
      user: leave.employee._id,
      message: `Your leave from ${leave.fromDate.toDateString()} to ${leave.toDate.toDateString()} has been approved`
    });

    res.json({ message: "Leave approved successfully" });
  } catch (error) {
    console.error("Approve error:", error);
    res.status(500).json({ message: "Approve failed" });
  }
};

/* =======================
   REJECT LEAVE
======================= */
export const rejectLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id).populate("employee");

    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    if (leave.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Leave already processed" });
    }

    // ❌ No balance change
    leave.status = "rejected";
    await leave.save();

    // 🔔 Notify employee
    await Notification.create({
      user: leave.employee._id,
      message: `Your leave request from ${leave.fromDate.toDateString()} to ${leave.toDate.toDateString()} was rejected`
    });

    res.json({ message: "Leave rejected successfully" });
  } catch (error) {
    console.error("Reject error:", error);
    res.status(500).json({ message: "Reject failed" });
  }
};
