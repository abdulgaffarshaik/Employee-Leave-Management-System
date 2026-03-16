import { useState } from "react";
import { registerUser } from "../api/auth.api";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    employeeId: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "employee",
    // designation: ""
  });

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await registerUser(form);
      alert("Registration Successful. Please Login.");
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={submit}>
        <h2>Create Account</h2>

        <input placeholder="Full Name" required onChange={e=>setForm({...form,name:e.target.value})}/>
        <input placeholder="Employee ID" required onChange={e=>setForm({...form,employeeId:e.target.value})}/>
        <input type="email" placeholder="Email" required onChange={e=>setForm({...form,email:e.target.value})}/>

        <select onChange={e=>setForm({...form,role:e.target.value})}>
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>

        {/* {form.role !== "admin" && (
          <input placeholder="Designation" onChange={e=>setForm({...form,designation:e.target.value})}/>
        )} */}

        <input type="password" placeholder="Password" required onChange={e=>setForm({...form,password:e.target.value})}/>
        <input type="password" placeholder="Confirm Password" required onChange={e=>setForm({...form,confirmPassword:e.target.value})}/>

        <button type="submit">Register</button> 

        <div className="auth-links">
          <Link to="/login">Already have an account? Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
