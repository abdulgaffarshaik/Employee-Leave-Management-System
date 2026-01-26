import { Link } from "react-router-dom";
import { useAuth } from "../../auth/store/AuthContext";
import "./Employee.css";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="emp-dashboard">
      <h1>Employee Dashboard</h1>
      <h2 className="emp-title">Welcome, {user?.name}</h2>

      <div className="emp-actions">
        <Link to="/employee/apply-leave" className="emp-card">
          Apply Leave
        </Link>

        <Link to="/employee/history" className="emp-card">
          View Leave History
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
