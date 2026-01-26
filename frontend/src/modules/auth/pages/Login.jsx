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

      // Redirect based on role
      const user = JSON.parse(localStorage.getItem("user"));
      if (user.role === "employee") navigate("/employee/dashboard");
      if (user.role === "manager") navigate("/manager/dashboard");
      if (user.role === "admin") navigate("/admin/dashboard");
    } catch (err) {
      alert(err.message || "Login Failed");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={submit}>
        <h2>Sign In</h2>

        <input
          placeholder="Employee ID or Email"
          required
          onChange={(e) => setForm({ ...form, identifier: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button type="submit">Login</button>

        <div className="auth-links">
          <Link to="/register">Create Account</Link>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
