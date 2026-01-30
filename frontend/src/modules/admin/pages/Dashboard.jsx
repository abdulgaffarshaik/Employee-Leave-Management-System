import { useEffect, useState } from "react";
import {
  getUsersAPI,
  getAllLeavesAPI,
  downloadCSVAPI
} from "../api/admin.api";
import "../../employee/pages/Employee.css";
import { useAuth } from "../../auth/store/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    getUsersAPI().then(setUsers);
    getAllLeavesAPI().then(setLeaves);
  }, []);

  const formatDate = (d) => new Date(d).toLocaleDateString();

  // 📊 ADMIN STATS
  const totalUsers = users.length;
  const employees = users.filter(u => u.role === "employee").length;
  const managers = users.filter(u => u.role === "manager").length;

  const totalLeaves = leaves.length;
  const pendingLeaves = leaves.filter(l => l.status === "pending").length;

  return (
    <div className="dashboard-wrapper">

      {/* HEADER */}
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>System Overview & Controls</p>
      </div>

      {/* STATS */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <h4>Total Users</h4>
          <h2>{totalUsers}</h2>
        </div>

        <div className="stat-card">
          <h4>Employees</h4>
          <h2>{employees}</h2>
        </div>

        <div className="stat-card">
          <h4>Managers</h4>
          <h2>{managers}</h2>
        </div>

        <div className="stat-card">
          <h4>Pending Leaves</h4>
          <h2 style={{ color: "#f59e0b" }}>{pendingLeaves}</h2>
        </div>
      </div>

      {/* USERS SECTION */}
      <div className="dashboard-header">
        <h3>👥 User Management</h3>
      </div>

      <table className="emp-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No users found
              </td>
            </tr>
          ) : (
            users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.employeeId}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* LEAVES SECTION */}
      <div className="dashboard-header" style={{ marginTop: "30px" }}>
        <h3>📝 Leave Records</h3>
      </div>

      <table className="emp-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Replacement</th>
            <th>Reason</th>
            <th>From</th>
            <th>To</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {leaves.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No leave records found
              </td>
            </tr>
          ) : (
            leaves.map((l) => (
              <tr key={l._id}>
                <td>{l.employee.name}</td>
                <td>{l.replacementEmployee?.name || "-"}</td>
                <td>{l.reason}</td>
                <td>{formatDate(l.fromDate)}</td>
                <td>{formatDate(l.toDate)}</td>
                <td className={`status ${l.status}`}>{l.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* REPORT */}
      <div style={{ textAlign: "right", marginTop: "20px" }}>
        <button onClick={downloadCSVAPI}>
          Download Leave Report (CSV)
        </button>
      </div>

    </div>
  );
};

export default Dashboard;
