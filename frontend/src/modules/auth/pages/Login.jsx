import { useState } from "react";
import { useAuth } from "../store/AuthContext";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const expectedRole = searchParams.get("role"); // Get role from URL

  const [form, setForm] = useState({
    identifier: "",
    password: ""
  });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      await login({
        employeeId: form.identifier,
        email: form.identifier,
        password: form.password,
        restrictRole: expectedRole // Send the role restriction to backend
      });

      const user = JSON.parse(localStorage.getItem("user"));
      
      // Route to correct dashboard based on role
      if (user.role === "employee") navigate("/employee/dashboard");
      else if (user.role === "manager") navigate("/manager/dashboard");
      else if (user.role === "admin") navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Login Failed");
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
            <h2>Sign In {expectedRole && `as ${expectedRole.charAt(0).toUpperCase() + expectedRole.slice(1)}`}</h2>

            {error && <div className="error-message" style={{
              background: "#fee",
              color: "#c33",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "15px",
              fontSize: "0.9rem",
              border: "1px solid #f99"
            }}>
              ⚠️ {error}
            </div>}

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
              <Link to="/">← Back to Welcome</Link>
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