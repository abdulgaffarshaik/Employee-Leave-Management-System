import React from "react";
import { useNavigate } from "react-router-dom";
import viteLogo from "/vite.svg";
import "./Welcome.css";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="shape shape1"></div>
        <div className="shape shape2"></div>
        <div className="shape shape3"></div>
      </div>

      {/* Main Content */}
      <div className="welcome-content">
        {/* Logo Section */}
        <div className="logo-section">
          <img src={viteLogo} alt="Vite Logo" className="vite-logo" />
          <h1 className="main-title">
            Employee Leave <span className="highlight">Management</span>
          </h1>
          <p className="subtitle">
            Streamline your leave requests and management
          </p>
        </div>

        {/* Welcome Cards */}
        <div className="welcome-cards">
          {/* Register Card */}
          <div className="card register-card">
            <div className="card-icon">📝</div>
            <h2>New Member?</h2>
            <p>Create your account and join our system</p>
            <button
              onClick={() => navigate("/register")}
              className="btn btn-primary"
            >
              Register Now
            </button>
          </div>

          {/* Employee Login Card */}
          <div className="card employee-card">
            <div className="card-icon">👤</div>
            <h2>Employee</h2>
            <p>Login as an employee to manage your leaves</p>
            <button
              onClick={() => navigate("/login?role=employee")}
              className="btn btn-employee"
            >
              Login as Employee
            </button>
          </div>

          {/* Manager Login Card */}
          <div className="card manager-card">
            <div className="card-icon">👨‍💼</div>
            <h2>Manager</h2>
            <p>Login as a manager to approve leaves</p>
            <button
              onClick={() => navigate("/login?role=manager")}
              className="btn btn-manager"
            >
              Login as Manager
            </button>
          </div>

          {/* Admin Login Card */}
          <div className="card admin-card">
            <div className="card-icon">👨‍💻</div>
            <h2>Administrator</h2>
            <p>Login as admin to manage the system</p>
            <button
              onClick={() => navigate("/login?role=admin")}
              className="btn btn-admin"
            >
              Login as Admin
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="welcome-footer">
          <p>© 2026 Employee Leave Management System</p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
