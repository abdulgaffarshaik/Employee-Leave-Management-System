import Leave from "../models/Leave.js";

export const applyLeave = async (req, res) => {
  try {
    const { reason, fromDate, toDate, description } = req.body;

    const today = new Date();
    if (new Date(fromDate) < today || new Date(toDate) < today) {
      return res.status(400).json({ message: "Past dates not allowed" });
    }

    const leave = await Leave.create({
      employee: req.user.id,
      reason,
      fromDate,
      toDate,
      description
    });

    res.status(201).json(leave);
  } catch {
    res.status(500).json({ message: "Leave application failed" });
  }
};

export const myLeaves = async (req, res) => {
  try {
    const { status, from, to } = req.query;

    let filter = { employee: req.user.id };

    if (status) filter.status = status;
    if (from && to)
      filter.fromDate = { $gte: new Date(from), $lte: new Date(to) };

    const leaves = await Leave.find(filter).sort({ createdAt: -1 });
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
      return res.status(400).json({ message: "Only pending leaves can be updated" });

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
      return res.status(400).json({ message: "Only pending leaves can be deleted" });

    await leave.deleteOne();
    res.json({ message: "Leave deleted" });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
};
