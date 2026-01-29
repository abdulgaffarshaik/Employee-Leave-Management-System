import { useState } from "react";
import { useAuth } from "../store/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    identifier: "",
    password: ""
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login({
        employeeId: form.identifier,
        email: form.identifier,
        password: form.password
      });

      const user = JSON.parse(localStorage.getItem("user"));
      if (user.role === "employee") navigate("/employee/dashboard");
      if (user.role === "manager") navigate("/manager/dashboard");
      if (user.role === "admin") navigate("/admin/dashboard");
    } catch (err) {
      alert(err.message || "Login Failed");
    }
  };

  return (
    <div className="login-page-wrapper">
      {/* Header */}
      <header className="top-left-header">
        <div className="header-content">
          <img
            src="src/assets/vvitheader.jpg"
            alt="Logo"
            className="header-logo"
          />
          <span className="app-name">ELMS</span>
        </div>
      </header>

      <div className="main-layout">
        {/* Left Side */}
        <div className="theme-side">
          <div className="illustration-wrapper">
            <img
              src="src/assets/undraw_handshake-deal_nwk6.png"
              alt="Illustration"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="form-side">
          {/* Floating Background Shapes */}
          <div className="bg-shapes">
            <span className="circle circle-1"></span>
            <span className="circle circle-2"></span>
            <span className="circle circle-3"></span>
          </div>

          <form className="auth-card" onSubmit={submit}>
            <h2>Sign In</h2>

            <div className="input-field">
              <input
                placeholder="Employee ID or Email"
                required
                onChange={(e) =>
                  setForm({ ...form, identifier: e.target.value })
                }
              />
            </div>

            <div className="input-field">
              <input
                type="password"
                placeholder="Password"
                required
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </div>

            <button className="login-btn" type="submit">
              LOGIN
            </button>

            <div className="auth-links">
              <Link to="/register">Register</Link>
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;