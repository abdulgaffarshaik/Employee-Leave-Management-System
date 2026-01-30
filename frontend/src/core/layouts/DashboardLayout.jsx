import { Outlet } from "react-router-dom";
import Navbar from "../../shared/components/Navbar";
import Sidebar from "../../shared/components/Sidebar";
import Footer from "../../shared/components/Footer";

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <Navbar />
        <div className="dashboard-content">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
