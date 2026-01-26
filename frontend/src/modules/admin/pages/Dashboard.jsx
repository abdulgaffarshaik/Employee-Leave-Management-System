import { useEffect, useState } from "react";
import { getUsersAPI, getAllLeavesAPI, downloadCSVAPI } from "../api/admin.api";
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

  return (
    <div className="emp-form-container">
      <h1 className="emp-main-title">Admin Dashboard</h1>
      <h3 className="emp-title">Welcome, {user?.name}</h3>

      <h3>All Users</h3>
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
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.employeeId}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <h3>All Leave Records</h3>
      <table className="emp-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Reason</th>
            <th>From</th>
            <th>To</th>
            <th>Status</th>
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
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ textAlign: "right", marginTop: "15px" }}>
        <button onClick={downloadCSVAPI}>Download CSV Report</button>
      </div>
    </div>
  );
};

export default Dashboard;
