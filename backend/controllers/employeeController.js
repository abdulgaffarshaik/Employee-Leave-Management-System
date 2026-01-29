import Leave from "../models/Leave.js";
import User from "../models/user.js";
import Notification from "../models/Notification.js";

export const applyLeave = async (req, res) => {
  try {
    const {
      reason,
      fromDate,
      toDate,
      description,
      replacementEmployee
    } = req.body;

    const user = await User.findById(req.user.id);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (new Date(fromDate) < today || new Date(toDate) < today) {
      return res.status(400).json({ message: "Past dates not allowed" });
    }

    // ✅ Calculate number of leave days
    const days =
      (new Date(toDate) - new Date(fromDate)) / (1000 * 60 * 60 * 24) + 1;

    // ❌ IMPORTANT: DO NOT CHECK LEAVE BALANCE HERE
    // Balance is checked only during manager approval

    // ❌ Prevent self replacement
    if (
      replacementEmployee &&
      replacementEmployee.toString() === user._id.toString()
    ) {
      return res
        .status(400)
        .json({ message: "Replacement cannot be same employee" });
    }

    // ❗ Check replacement availability
    if (replacementEmployee) {
      const conflict = await Leave.findOne({
        employee: replacementEmployee,
        status: "approved",
        $or: [
          { fromDate: { $lte: toDate }, toDate: { $gte: fromDate } }
        ]
      });

      if (conflict) {
        return res.status(400).json({
          message:
            "Replacement employee is already on leave during this period"
        });
      }
    }

    // ✅ Create leave (status = pending)
    const leave = await Leave.create({
      employee: user._id,
      reason,
      fromDate,
      toDate,
      description,
      replacementEmployee: replacementEmployee || null
    });

    // 🔔 Notify replacement employee
    if (replacementEmployee) {
      await Notification.create({
        user: replacementEmployee,
        message: `You have been selected as replacement from ${new Date(
          fromDate
        ).toDateString()} to ${new Date(toDate).toDateString()}`
      });
    }

    res.status(201).json(leave);
  } catch (error) {
    res.status(500).json({ message: "Leave application failed" });
  }
};

export const myLeaves = async (req, res) => {
  try {
    const { status, from, to } = req.query;

    let filter = { employee: req.user.id };

    if (status) filter.status = status;
    if (from && to) {
      filter.fromDate = { $gte: new Date(from), $lte: new Date(to) };
    }

    const leaves = await Leave.find(filter)
      .populate("replacementEmployee", "name employeeId")
      .sort({ createdAt: -1 });

    res.json(leaves);
  } catch {
    res.status(500).json({ message: "Failed to fetch leaves" });
  }
};

export const updateLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);

    if (!leave || leave.employee.toString() !== req.user.id)
      return res.status(403).json({ message: "Not allowed" });

    if (leave.status !== "pending")
      return res
        .status(400)
        .json({ message: "Only pending leaves can be updated" });

    Object.assign(leave, req.body);
    await leave.save();

    res.json({ message: "Leave updated" });
  } catch {
    res.status(500).json({ message: "Update failed" });
  }
};

export const deleteLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);

    if (!leave || leave.employee.toString() !== req.user.id)
      return res.status(403).json({ message: "Not allowed" });

    if (leave.status !== "pending")
      return res
        .status(400)
        .json({ message: "Only pending leaves can be deleted" });

    await leave.deleteOne();
    res.json({ message: "Leave deleted" });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
};

// ✅ REQUIRED FOR REPLACEMENT DROPDOWN
export const listEmployees = async (req, res) => {
  try {
    const employees = await User.find({
      role: "employee",
      _id: { $ne: req.user.id }
    }).select("name employeeId");

    res.json(employees);
  } catch {
    res.status(500).json({ message: "Failed to fetch employees" });
  }
};
