import Leave from "../models/Leave.js";
import User from "../models/User.js";

export const getAllLeaves = async (req, res) => {
  try {
    const { status, from, to } = req.query;

    let filter = {};

    if (status) filter.status = status;
    if (from && to)
      filter.fromDate = { $gte: new Date(from), $lte: new Date(to) };

    const leaves = await Leave.find(filter)
      .populate("employee", "name employeeId")
      .sort({ createdAt: -1 });

    res.json(leaves);
  } catch {
    res.status(500).json({ message: "Failed to fetch leaves" });
  }
};

export const approveLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave) return res.status(404).json({ message: "Leave not found" });

    leave.status = "approved";
    await leave.save();

    res.json({ message: "Leave approved" });
  } catch {
    res.status(500).json({ message: "Approve failed" });
  }
};

export const rejectLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave) return res.status(404).json({ message: "Leave not found" });

    leave.status = "rejected";
    await leave.save();

    res.json({ message: "Leave rejected" });
  } catch {
    res.status(500).json({ message: "Reject failed" });
  }
};
