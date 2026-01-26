import { useEffect, useState } from "react";
import { getAllLeavesAPI, approveLeaveAPI, rejectLeaveAPI } from "../api/manager.api";
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

  const formatDate = (d) => new Date(d).toLocaleDateString();

  return (
    <div className="emp-form-container"> 
      <h1 className="emp-main-title">Manager Dashboard</h1>
      <h3 className="emp-title">Welcome, {user?.name}</h3>

      <h3 className="emp-title">Employee Leave Requests</h3>

      {/* Filters */}
      <div className="filter-bar">
        <div className="filter-item">
            <label>Status</label>
            <select onChange={(e) => setStatus(e.target.value)}>
                <option value="">All</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="pending">Pending</option>
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
            <button onClick={loadData}>Filter</button>
        </div>
      </div>

      <table className="emp-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Reason</th>
            <th>From</th>
            <th>To</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((l) => (
            <tr key={l._id}>
              <td>{l.employee.name}</td>
              <td>{l.reason}</td>
              <td>{formatDate(l.fromDate)}</td>
              <td>{formatDate(l.toDate)}</td>
              <td className={`status ${l.status}`}>{l.status}</td>
              <td>
                {l.status === "pending" && (
                  <>
                    <button onClick={() => approve(l._id)}>Approve</button>
                    <button onClick={() => reject(l._id)}>Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
