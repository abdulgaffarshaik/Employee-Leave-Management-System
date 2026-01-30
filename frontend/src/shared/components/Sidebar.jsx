import { Link } from "react-router-dom";
import { useAuth } from "../../modules/auth/store/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <div className="sidebar">
      <h3>ELMS</h3>

      {user?.role === "employee" && (
        <>
          <Link to="/employee/dashboard">Dashboard</Link>
          <Link to="/employee/apply-leave">Apply Leave</Link>
          <Link to="/employee/history">Leave History</Link>
        </>
      )}

      {user?.role === "manager" && (
        <>
          <Link to="/manager/dashboard">Dashboard</Link>
        </>
      )}

      {user?.role === "admin" && (
        <>
          <Link to="/admin/dashboard">Dashboard</Link>
          
        </>
      )}
    </div>
  );
};

export default Sidebar;
