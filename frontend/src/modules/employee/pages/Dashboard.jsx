import { Link } from "react-router-dom";
import { useAuth } from "../../auth/store/AuthContext";
import { useEffect, useState } from "react";
import {
  getNotificationsAPI,
  getMyLeavesAPI
} from "../api/employee.api";
import "./Employee.css";

const Dashboard = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    getNotificationsAPI().then(setNotifications);
    getMyLeavesAPI().then(setLeaves);
  }, []);

  // 🔢 CONSTANT
  const TOTAL_LEAVES = 4;

  // 🧮 CALCULATE USED LEAVE DAYS
  const usedLeaves = leaves
    .filter(l => l.status === "approved")
    .reduce((sum, l) => {
      const days =
        (new Date(l.toDate) - new Date(l.fromDate)) /
          (1000 * 60 * 60 * 24) +
        1;
      return sum + days;
    }, 0);

  // 🧮 CALCULATE PENDING LEAVE DAYS
  const pendingLeaves = leaves
    .filter(l => l.status === "pending")
    .reduce((sum, l) => {
      const days =
        (new Date(l.toDate) - new Date(l.fromDate)) /
          (1000 * 60 * 60 * 24) +
        1;
      return sum + days;
    }, 0);

  // 🧮 REMAINING
  const remainingLeaves =
    TOTAL_LEAVES - usedLeaves - pendingLeaves;

  return (
    <div className="emp-dashboard">

      {/* HEADER */}
      <h1 className="emp-main-title">Employee Dashboard</h1>
      <h2 className="emp-title">Welcome, {user?.name}</h2>

      {/* 🔢 LEAVE SUMMARY */}
      <div className="leave-summary">
        <div className="summary-card total">
          <h3>Total Leaves</h3>
          <p>{TOTAL_LEAVES}</p>
        </div>

        <div className="summary-card used">
          <h3>Used Leaves</h3>
          <p>{usedLeaves}</p>
        </div>

        <div className="summary-card pending">
          <h3>Pending Requests</h3>
          <p>{pendingLeaves}</p>
        </div>

        <div className="summary-card remaining">
          <h3>Remaining Leaves</h3>
          <p>{remainingLeaves < 0 ? 0 : remainingLeaves}</p>
        </div>
      </div>

      {/* 🔔 NOTIFICATIONS */}
      <h3 className="emp-title">Notifications</h3>
      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        <ul className="notification-list">
          {notifications.map(n => (
            <li key={n._id}>{n.message}</li>
          ))}
        </ul>
      )}

      {/* ACTION BUTTONS */}
      <div className="emp-actions">
        <Link to="/employee/apply-leave" className="emp-card">
          Apply Leave
        </Link>

        <Link to="/employee/history" className="emp-card">
          Leave History
        </Link>
      </div>

    </div>
  );
};

export default Dashboard;
