import { useState } from "react";
import { applyLeaveAPI } from "../api/employee.api";
import "./Employee.css";

const ApplyLeave = () => {
  const [form, setForm] = useState({
    fromDate: "",
    toDate: "",
    reason: "",
    description: ""
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await applyLeaveAPI(form);
      alert("Leave Applied Successfully");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="emp-form-container">
      <h2 className="emp-title">Apply Leave</h2>

      <form className="emp-form" onSubmit={submit}>
        <div>
            <label>Reason</label>
            <input
                type = "text"
                required
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
            />
        </div>
        <div>
          <label>From Date</label>
          <input
            type="date"
            required
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setForm({ ...form, fromDate: e.target.value })}
          />
        </div>

        <div>
          <label>To Date</label>
          <input
            type="date"
            required
            min={form.fromDate}
            onChange={(e) => setForm({ ...form, toDate: e.target.value })}
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            rows="4"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <button type="submit">Apply Leave</button>
      </form>
    </div>
  );
};

export default ApplyLeave;
