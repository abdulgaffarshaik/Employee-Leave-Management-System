import { useEffect, useState } from "react";
import {
  getAllLeavesAPI,
  approveLeaveAPI,
  rejectLeaveAPI
} from "../api/manager.api";
import "../../employee/pages/Employee.css";
import { useAuth } from "../../auth/store/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [status, setStatus] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const loadData = () => {
    let query = "?";
    if (status) query += `status=${status}&`;
    if (from && to) query += `from=${from}&to=${to}`;
    getAllLeavesAPI(query).then(setLeaves);
  };

  useEffect(() => {
    loadData();
  }, []);

  const approve = async (id) => {
    await approveLeaveAPI(id);
    loadData();
  };

  const reject = async (id) => {
    await rejectLeaveAPI(id);
    loadData();
  };

  // 📊 Manager Stats
  const total = leaves.length;
  const pending = leaves.filter(l => l.status === "pending").length;
  const approved = leaves.filter(l => l.status === "approved").length;
  const rejected = leaves.filter(l => l.status === "rejected").length;

  const formatDate = (d) => new Date(d).toLocaleDateString();

  return (
    <div className="dashboard-wrapper">

      {/* HEADER */}
      <div className="dashboard-header">
        <h1>Manager Dashboard</h1>
        <p>Welcome, {user?.name}</p>
      </div>

      {/* STATS */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <h4>Total Requests</h4>
          <h2>{total}</h2>
        </div>

        <div className="stat-card">
          <h4>Pending Approval</h4>
          <h2 style={{ color: "#f59e0b" }}>{pending}</h2>
        </div>

        <div className="stat-card">
          <h4>Approved</h4>
          <h2 style={{ color: "#16a34a" }}>{approved}</h2>
        </div>

        <div className="stat-card">
          <h4>Rejected</h4>
          <h2 style={{ color: "#dc2626" }}>{rejected}</h2>
        </div>
      </div>

      {/* FILTERS */}
      <div className="filter-bar">
        <div className="filter-item">
          <label>Status</label>
          <select onChange={(e) => setStatus(e.target.value)}>
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="filter-item">
          <label>From Date</label>
          <input type="date" onChange={(e) => setFrom(e.target.value)} />
        </div>

        <div className="filter-item">
          <label>To Date</label>
          <input type="date" onChange={(e) => setTo(e.target.value)} />
        </div>

        <div className="filter-item">
          <label>&nbsp;</label>
          <button onClick={loadData}>Apply</button>
        </div>
      </div>

      {/* TABLE */}
      <table className="emp-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Replacement</th>
            <th>Reason</th>
            <th>From</th>
            <th>To</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {leaves.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No leave records
              </td>
            </tr>
          ) : (
            leaves.map((l) => (
              <tr key={l._id}
                style={
                  l.status === "pending"
                    ? { background: "rgba(245,158,11,0.08)" }
                    : {}
                }
              >
                <td>{l.employee.name}</td>
                <td>{l.replacementEmployee?.name || "-"}</td>
                <td>{l.reason}</td>
                <td>{formatDate(l.fromDate)}</td>
                <td>{formatDate(l.toDate)}</td>
                <td className={`status ${l.status}`}>{l.status}</td>
                <td>
                  {l.status === "pending" ? (
                    <>
                      <button
                        style={{ background: "#16a34a", color: "#fff" }}
                        onClick={() => approve(l._id)}
                      >
                        Approve
                      </button>
                      <button
                        style={{ background: "#dc2626", color: "#fff" }}
                        onClick={() => reject(l._id)}
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span>-</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

    </div>
  );
};

export default Dashboard;
