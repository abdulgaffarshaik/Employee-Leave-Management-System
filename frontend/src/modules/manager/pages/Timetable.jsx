import { useEffect, useState } from "react";
import {
  getAllTimetablesAPI,
  createTimetableAPI,
  updateTimetableAPI,
  deleteTimetableAPI
} from "../api/timetable.api";
import { useAuth } from "../../auth/store/AuthContext";
import "../../employee/pages/Employee.css";

const TimetableManager = () => {
  const { user } = useAuth();
  const [timetables, setTimetables] = useState([]);
  const [selectedTimetable, setSelectedTimetable] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    academicYear: "",
    semester: "",
    class: "",
    section: "",
    room: "",
    classTeacher: "",
    schedule: {}, // Will be object with day -> timeSlot -> {subject, faculty}
    facultyDetails: []
  });

  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const timeSlots = [
    "08:00-8:50",
    "8:50-9:10",
    "9:10-10:00",
    "10:00-10:50",
    "10:50-11:10",
    "11:10-12:00",
    "12:00-12:50",
    "12:5-1:40",
    "1:40-2:30",
    "2:30-3:50"
  ];

  useEffect(() => {
    loadTimetables();
  }, []);

  const loadTimetables = async () => {
    const data = await getAllTimetablesAPI();
    setTimetables(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGridChange = (day, timeSlot, field, value) => {
    setFormData((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [day]: {
          ...(prev.schedule[day] || {}),
          [timeSlot]: {
            ...(prev.schedule[day]?.[timeSlot] || {}),
            [field]: value
          }
        }
      }
    }));
  };

  const handleFacultyChange = (index, field, value) => {
    const updated = [...formData.facultyDetails];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, facultyDetails: updated });
  };

  const addFacultyRow = () => {
    setFormData({
      ...formData,
      facultyDetails: [...formData.facultyDetails, { subjectCode: "", subjectName: "", facultyName: "" }]
    });
  };

  const removeFacultyRow = (index) => {
    const updated = formData.facultyDetails.filter((_, i) => i !== index);
    setFormData({ ...formData, facultyDetails: updated });
  };

  const convertScheduleForSave = () => {
    // Convert 2D grid object back to array for backend
    const scheduleArray = [];
    Object.keys(formData.schedule).forEach((day) => {
      Object.keys(formData.schedule[day]).forEach((timeSlot) => {
        const { subject, faculty } = formData.schedule[day][timeSlot];
        scheduleArray.push({
          day,
          timeSlot,
          subject: subject || "",
          faculty: faculty || ""
        });
      });
    });
    return scheduleArray;
  };

  const convertScheduleForDisplay = (scheduleArray) => {
    // Convert array from backend to 2D grid object
    const grid = {};
    scheduleArray.forEach((item) => {
      if (!grid[item.day]) grid[item.day] = {};
      grid[item.day][item.timeSlot] = {
        subject: item.subject || "",
        faculty: item.faculty || ""
      };
    });
    return grid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataToSend = {
        ...formData,
        schedule: convertScheduleForSave()
      };

      if (selectedTimetable) {
        await updateTimetableAPI(selectedTimetable._id, dataToSend);
        alert("Timetable updated successfully!");
      } else {
        await createTimetableAPI(dataToSend);
        alert("Timetable created successfully!");
      }

      setShowForm(false);
      setFormData({
        academicYear: "",
        semester: "",
        class: "",
        section: "",
        room: "",
        classTeacher: "",
        schedule: {},
        facultyDetails: []
      });
      setSelectedTimetable(null);
      loadTimetables();
    } catch (error) {
      alert("Failed to save timetable: " + error.message);
    }
  };

  const handleEdit = (timetable) => {
    setSelectedTimetable(timetable);
    setFormData({
      academicYear: timetable.academicYear,
      semester: timetable.semester,
      class: timetable.class,
      section: timetable.section,
      room: timetable.room,
      classTeacher: timetable.classTeacher,
      schedule: convertScheduleForDisplay(timetable.schedule),
      facultyDetails: timetable.facultyDetails
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this timetable?")) {
      await deleteTimetableAPI(id);
      loadTimetables();
      alert("Timetable deleted!");
    }
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <h1>Timetable Management</h1>
        <p>Manage class timetables and faculty assignments</p>
      </div>

      {!showForm ? (
        <div>
          <button
            onClick={() => {
              setShowForm(true);
              setSelectedTimetable(null);
              setFormData({
                academicYear: "",
                semester: "",
                class: "",
                section: "",
                room: "",
                classTeacher: "",
                schedule: {},
                facultyDetails: []
              });
            }}
            style={{
              padding: "10px 20px",
              marginBottom: "20px",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            ➕ Create New Timetable
          </button>

          {/* Timetables List */}
          <div className="timetables-grid" style={{ marginTop: "20px" }}>
            {timetables.length === 0 ? (
              <p>No timetables found. Create one to get started!</p>
            ) : (
              timetables.map((tt) => (
                <div
                  key={tt._id}
                  style={{
                    border: "1px solid #ddd",
                    padding: "15px",
                    borderRadius: "8px",
                    marginBottom: "15px",
                    backgroundColor: "#f9fafb"
                  }}
                >
                  <h3>{tt.class} - Section {tt.section}</h3>
                  <p>Room: {tt.room}</p>
                  <p>Academic Year: {tt.academicYear} | Semester: {tt.semester}</p>
                  <p>Class Teacher: {tt.classTeacher}</p>
                  <div style={{ marginTop: "10px" }}>
                    <button
                      onClick={() => handleEdit(tt)}
                      style={{
                        padding: "8px 15px",
                        marginRight: "10px",
                        backgroundColor: "#10b981",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                      }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(tt._id)}
                      style={{
                        padding: "8px 15px",
                        backgroundColor: "#ef4444",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2>{selectedTimetable ? "Edit Timetable" : "Create New Timetable"}</h2>

          {/* Basic Info */}
          <div className="form-section" style={{ marginBottom: "20px" }}>
            <h3>Basic Information</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              <input
                type="text"
                name="academicYear"
                placeholder="Academic Year (e.g., 2025-26)"
                value={formData.academicYear}
                onChange={handleInputChange}
                required
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px"
                }}
              />
              <input
                type="number"
                name="semester"
                placeholder="Semester"
                value={formData.semester}
                onChange={handleInputChange}
                required
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px"
                }}
              />
              <input
                type="text"
                name="class"
                placeholder="Class (e.g., III B.TECH)"
                value={formData.class}
                onChange={handleInputChange}
                required
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px"
                }}
              />
              <input
                type="text"
                name="section"
                placeholder="Section (e.g., B)"
                value={formData.section}
                onChange={handleInputChange}
                required
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px"
                }}
              />
              <input
                type="text"
                name="room"
                placeholder="Room No. (e.g., B-206)"
                value={formData.room}
                onChange={handleInputChange}
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px"
                }}
              />
              <input
                type="text"
                name="classTeacher"
                placeholder="Class Teacher Name"
                value={formData.classTeacher}
                onChange={handleInputChange}
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px"
                }}
              />
            </div>
          </div>

          {/* 2D Grid Schedule */}
          <div className="form-section" style={{ marginBottom: "20px" }}>
            <h3>📅 Class Schedule (Days × Time Slots)</h3>
            <p style={{ fontSize: "12px", color: "#666", marginBottom: "15px" }}>
              Click on any cell to enter the subject code and faculty name
            </p>
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  backgroundColor: "white",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: "#1f2937" }}>
                    <th
                      style={{
                        padding: "12px",
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "left",
                        minWidth: "100px"
                      }}
                    >
                      DAY
                    </th>
                    {timeSlots.map((slot) => (
                      <th
                        key={slot}
                        style={{
                          padding: "12px",
                          color: "white",
                          fontWeight: "bold",
                          textAlign: "center",
                          minWidth: "180px",
                          borderLeft: "1px solid #444"
                        }}
                      >
                        {slot}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {days.map((day, dayIdx) => (
                    <tr
                      key={day}
                      style={{
                        backgroundColor: dayIdx % 2 === 0 ? "#f9fafb" : "white",
                        borderBottom: "1px solid #e5e7eb"
                      }}
                    >
                      <td
                        style={{
                          padding: "12px",
                          fontWeight: "bold",
                          backgroundColor: "#f3f4f6",
                          minWidth: "100px",
                          borderRight: "2px solid #d1d5db"
                        }}
                      >
                        {day}
                      </td>
                      {timeSlots.map((slot) => (
                        <td
                          key={`${day}-${slot}`}
                          style={{
                            padding: "0",
                            minWidth: "180px",
                            borderLeft: "1px solid #e5e7eb",
                            position: "relative"
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              height: "100px",
                              padding: "8px"
                            }}
                          >
                            <input
                              type="text"
                              placeholder="Subject"
                              value={
                                formData.schedule[day]?.[slot]?.subject || ""
                              }
                              onChange={(e) =>
                                handleGridChange(
                                  day,
                                  slot,
                                  "subject",
                                  e.target.value
                                )
                              }
                              style={{
                                padding: "6px",
                                marginBottom: "4px",
                                border: "1px solid #ddd",
                                borderRadius: "3px",
                                fontSize: "12px",
                                fontWeight: "bold"
                              }}
                            />
                            <input
                              type="text"
                              placeholder="Faculty"
                              value={
                                formData.schedule[day]?.[slot]?.faculty || ""
                              }
                              onChange={(e) =>
                                handleGridChange(
                                  day,
                                  slot,
                                  "faculty",
                                  e.target.value
                                )
                              }
                              style={{
                                padding: "6px",
                                border: "1px solid #ddd",
                                borderRadius: "3px",
                                fontSize: "11px"
                              }}
                            />
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Faculty Details */}
          <div className="form-section" style={{ marginBottom: "20px" }}>
            <h3>Faculty Details</h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#f0f0f0" }}>
                  <th style={{ padding: "10px", border: "1px solid #ddd", textAlign: "left" }}>Subject Code</th>
                  <th style={{ padding: "10px", border: "1px solid #ddd", textAlign: "left" }}>Subject Name</th>
                  <th style={{ padding: "10px", border: "1px solid #ddd", textAlign: "left" }}>Faculty Name</th>
                  <th style={{ padding: "10px", border: "1px solid #ddd", textAlign: "left" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {formData.facultyDetails.map((row, idx) => (
                  <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? "#f9f9f9" : "#fff" }}>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <input
                        type="text"
                        value={row.subjectCode}
                        onChange={(e) => handleFacultyChange(idx, "subjectCode", e.target.value)}
                        placeholder="e.g., EPHT"
                        style={{ width: "100%", padding: "5px", borderRadius: "3px" }}
                      />
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <input
                        type="text"
                        value={row.subjectName}
                        onChange={(e) => handleFacultyChange(idx, "subjectName", e.target.value)}
                        placeholder="Subject Name"
                        style={{ width: "100%", padding: "5px", borderRadius: "3px" }}
                      />
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <input
                        type="text"
                        value={row.facultyName}
                        onChange={(e) => handleFacultyChange(idx, "facultyName", e.target.value)}
                        placeholder="Faculty Name"
                        style={{ width: "100%", padding: "5px", borderRadius: "3px" }}
                      />
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>
                      <button
                        type="button"
                        onClick={() => removeFacultyRow(idx)}
                        style={{
                          padding: "5px 10px",
                          backgroundColor: "#ef4444",
                          color: "white",
                          border: "none",
                          borderRadius: "3px",
                          cursor: "pointer"
                        }}
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              type="button"
              onClick={addFacultyRow}
              style={{
                marginTop: "10px",
                padding: "8px 15px",
                backgroundColor: "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              + Add Faculty
            </button>
          </div>

          {/* Form Actions */}
          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <button
              type="submit"
              style={{
                padding: "10px 30px",
                backgroundColor: "#16a34a",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "16px"
              }}
            >
              💾 Save Timetable
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              style={{
                padding: "10px 30px",
                backgroundColor: "#6b7280",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "16px"
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default TimetableManager;
