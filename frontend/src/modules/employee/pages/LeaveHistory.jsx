import { useEffect, useState } from "react";
import { getMyLeavesAPI, deleteLeaveAPI, updateLeaveAPI } from "../api/employee.api";
import "./Employee.css";

const LeaveHistory = () => {
  const [leaves, setLeaves] = useState([]);
  const [status, setStatus] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const loadData = () => {
    let query = "?";
    if (status) query += `status=${status}&`;
    if (from && to) query += `from=${from}&to=${to}`;
    getMyLeavesAPI(query).then(setLeaves);
  };

  useEffect(() => {
    loadData();
  }, []);

  const formatDate = (d) => new Date(d).toLocaleDateString();

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this leave?")) return;

    try {
        await deleteLeaveAPI(id);
        alert("Leave Deleted");
        loadData();
    } catch (err) {
        alert(err.message);
    }
  };


  const handleUpdate = async (leave) => {
    const newReason = prompt("Update Reason", leave.reason);
    if (!newReason) return;

    try {
        await updateLeaveAPI(leave._id, { reason: newReason });
        alert("Leave Updated Successfully");
        loadData();
    } catch (err) {
        alert(err.message);
    }
  };



  return (
    <div className="emp-form-container">
      <h2 className="emp-title">Leave History</h2>

      <div className="filter-bar">
        <div className="filter-item">
            <label>Status</label>
            <select onChange={(e) => setStatus(e.target.value)}>
                <option value="">All</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="pending">Pending</option>
            </select>
        </div>
        <div className="filter-item">
            <label>From Date</label>
            <input type="date" onChange={(e) => setFrom(e.target.value)} />
        </div>
        <div className="filter-item">
            <label>To Date</label>
            <input type="date" onChange={(e) => setTo(e.target.value)} />
        </div>


        <div className="filter-item">
            <label>&nbsp;</label>
            <button onClick={loadData}>Filter</button>
        </div>

      </div>

        <table className="emp-table">
            <thead>
                <tr>
                    <th>Reason</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {leaves.map((l) => (
                    <tr key={l._id}>
                        <td>{l.reason}</td>
                        <td>{formatDate(l.fromDate)}</td>
                        <td>{formatDate(l.toDate)}</td>
                        <td className={`status ${l.status}`}>{l.status}</td>
                        <td>
                            {l.status === "pending" ? (
                                <>
                                    <button onClick={() => handleUpdate(l)}>Update</button>
                                    <button onClick={() => handleDelete(l._id)}>Delete</button>
                                </>
                            ) : (
                                <span>-</span>
                            )}
                        </td>

                    </tr>
                ))}
            </tbody>
        </table>

    </div>
  );
};

export default LeaveHistory;
