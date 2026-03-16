import { useState } from "react";
import { resetPassword } from "../api/auth.api";
import { Link } from "react-router-dom";
import "./Auth.css";

const ForgotPassword = () => {
  const [form, setForm] = useState({
    employeeId: "",
    newPassword: "",
    confirmPassword: ""
  });

  const submit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await resetPassword(form);
      alert("Password Reset Successful");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={submit}>
        <h2>Reset Password</h2>

        <input placeholder="Employee ID" required onChange={e=>setForm({...form,employeeId:e.target.value})}/>
        <input type="password" placeholder="New Password" required onChange={e=>setForm({...form,newPassword:e.target.value})}/>
        <input type="password" placeholder="Confirm Password" required onChange={e=>setForm({...form,confirmPassword:e.target.value})}/>

        <button type="submit">Reset Password</button>

        <div className="auth-links">
          <Link to="/login">Back to Login</Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
