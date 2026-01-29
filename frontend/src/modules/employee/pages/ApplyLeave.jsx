import { useEffect, useState } from "react";
import { applyLeaveAPI, getEmployeesAPI } from "../api/employee.api";
import "./Employee.css";

const ApplyLeave = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    fromDate: "",
    toDate: "",
    reason: "",
    description: "",
    replacementEmployee: ""
  });

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data = await getEmployeesAPI();
        console.log("Employees fetched:", data); // 🔍 DEBUG
        setEmployees(data || []);
      } catch (err) {
        console.error("Failed to fetch employees", err.message);
      } finally {
        setLoading(false);
      }
    };

    loadEmployees();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await applyLeaveAPI(form);
      alert("Leave Applied Successfully");
      setForm({
        fromDate: "",
        toDate: "",
        reason: "",
        description: "",
        replacementEmployee: ""
      });
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
            type="text"
            value={form.reason}
            required
            onChange={(e) =>
              setForm({ ...form, reason: e.target.value })
            }
          />
        </div>

        <div>
          <label>From Date</label>
          <input
            type="date"
            value={form.fromDate}
            required
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) =>
              setForm({ ...form, fromDate: e.target.value })
            }
          />
        </div>

        <div>
          <label>To Date</label>
          <input
            type="date"
            value={form.toDate}
            required
            min={form.fromDate}
            onChange={(e) =>
              setForm({ ...form, toDate: e.target.value })
            }
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            rows="3"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>

        {/* ✅ Replacement Employee */}
        <div>
          <label>Replacement Employee</label>

          <select
            value={form.replacementEmployee}
            onChange={(e) =>
              setForm({
                ...form,
                replacementEmployee: e.target.value
              })
            }
          >
            <option value="">-- Select Replacement --</option>

            {loading && <option disabled>Loading...</option>}

            {!loading && employees.length === 0 && (
              <option disabled>No employees available</option>
            )}

            {!loading &&
              employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.name} ({emp.employeeId})
                </option>
              ))}
          </select>
        </div>

        <button type="submit">Apply Leave</button>
      </form>
    </div>
  );
};

export default ApplyLeave;
