import User from "../models/user.js";
import Leave from "../models/Leave.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate("employee", "name employeeId")
      .populate("replacementEmployee", "name employeeId")
      .sort({ createdAt: -1 });

    res.json(leaves);
  } catch {
    res.status(500).json({ message: "Failed to fetch leaves" });
  }
};

export const downloadCSV = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate("employee", "name employeeId")
      .populate("replacementEmployee", "name employeeId");

    let csv =
      "EmployeeID,EmployeeName,ReplacementID,ReplacementName,Reason,From,To,Status\n";

    leaves.forEach((l) => {
      csv += `${l.employee.employeeId},${l.employee.name},${
        l.replacementEmployee?.employeeId || "N/A"
      },${l.replacementEmployee?.name || "N/A"},${l.reason},${l.fromDate.toDateString()},${l.toDate.toDateString()},${l.status}\n`;
    });

    res.header("Content-Type", "text/csv");
    res.attachment("leave-report.csv");
    res.send(csv);
  } catch {
    res.status(500).json({ message: "CSV generation failed" });
  }
};
