import { useEffect, useState } from "react";
import { getTimetableByClassSectionAPI } from "../../manager/api/timetable.api";
import "../../employee/pages/Employee.css";

const TimetableView = () => {
  const [timetable, setTimetable] = useState(null);
  const [loading, setLoading] = useState(false);
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [error, setError] = useState("");

  const classOptions = ["III B.TECH", "IV B.TECH", "II B.TECH", "I B.TECH"];
  const sectionOptions = ["A", "B", "C"];

  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const loadTimetable = async () => {
    if (!className || !section) {
      setError("Please select class and section");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const data = await getTimetableByClassSectionAPI(className, section);
      setTimetable(data);
    } catch (err) {
      setError("Timetable not found for this class");
      setTimetable(null);
    } finally {
      setLoading(false);
    }
  };

  // Convert array schedule to 2D grid object
  const buildScheduleGrid = () => {
    if (!timetable || !timetable.schedule) return {};
    
    const grid = {};
    timetable.schedule.forEach((item) => {
      if (!grid[item.day]) grid[item.day] = {};
      grid[item.day][item.timeSlot] = {
        subject: item.subject || "—",
        faculty: item.faculty || "N/A"
      };
    });
    return grid;
  };

  // Get unique time slots from schedule
  const getTimeSlots = () => {
    if (!timetable || !timetable.schedule) return [];
    return [...new Set(timetable.schedule.map((s) => s.timeSlot))].sort();
  };

  const scheduleGrid = buildScheduleGrid();
  const timeSlots = getTimeSlots();

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <h1>📚 Class Timetable</h1>
        <p>View your class schedule and faculty assignments</p>
      </div>

      {/* Search Section */}
      <div
        className="filter-bar"
        style={{ marginBottom: "20px" }}
      >
        <div className="filter-item">
          <label>Class</label>
          <select
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              fontSize: "14px"
            }}
          >
            <option value="">Select Class</option>
            {classOptions.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label>Section</label>
          <select
            value={section}
            onChange={(e) => setSection(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              fontSize: "14px"
            }}
          >
            <option value="">Select Section</option>
            {sectionOptions.map((sec) => (
              <option key={sec} value={sec}>
                {sec}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label>&nbsp;</label>
          <button
            onClick={loadTimetable}
            disabled={loading}
            style={{
              padding: "8px 20px",
              backgroundColor: loading ? "#9ca3af" : "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "14px"
            }}
          >
            {loading ? "Loading..." : "📋 View Timetable"}
          </button>
        </div>
      </div>

      {error && (
        <div
          style={{
            padding: "15px",
            backgroundColor: "#fee2e2",
            color: "#991b1b",
            borderRadius: "4px",
            marginBottom: "20px"
          }}
        >
          ⚠️ {error}
        </div>
      )}

      {/* Timetable Display */}
      {timetable && (
        <div style={{ backgroundColor: "#f9fafb", padding: "20px", borderRadius: "8px" }}>
          {/* Timetable Info Header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gap: "20px",
              marginBottom: "30px"
            }}
          >
            <div>
              <strong>Academic Year:</strong>
              <p>{timetable.academicYear}</p>
            </div>
            <div>
              <strong>Semester:</strong>
              <p>Semester {timetable.semester}</p>
            </div>
            <div>
              <strong>Room:</strong>
              <p>{timetable.room || "N/A"}</p>
            </div>
            <div>
              <strong>Class Teacher:</strong>
              <p>{timetable.classTeacher || "N/A"}</p>
            </div>
          </div>

          {/* Timetable Grid */}
          <div style={{ overflowX: "auto", marginBottom: "30px" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                backgroundColor: "white",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#1f2937", color: "white" }}>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      fontWeight: "bold",
                      minWidth: "100px",
                      borderRight: "2px solid #444"
                    }}
                  >
                    DAY
                  </th>
                  {timeSlots.map((slot) => (
                    <th
                      key={slot}
                      style={{
                        padding: "12px",
                        textAlign: "center",
                        fontWeight: "bold",
                        minWidth: "200px",
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
                    {timeSlots.map((slot) => {
                      const classInfo = scheduleGrid[day]?.[slot];
                      return (
                        <td
                          key={`${day}-${slot}`}
                          style={{
                            padding: "12px",
                            minWidth: "200px",
                            borderLeft: "1px solid #e5e7eb",
                            textAlign: "center"
                          }}
                        >
                          {classInfo ? (
                            <div style={{ lineHeight: "1.8" }}>
                              <div
                                style={{
                                  fontWeight: "bold",
                                  color: "#1f2937",
                                  marginBottom: "6px",
                                  fontSize: "14px",
                                  backgroundColor: "#e0f2fe",
                                  padding: "6px",
                                  borderRadius: "4px"
                                }}
                              >
                                {classInfo.subject}
                              </div>
                              <div style={{ fontSize: "13px", color: "#4b5563" }}>
                                👨‍🏫 {classInfo.faculty}
                              </div>
                            </div>
                          ) : (
                            <span style={{ color: "#d1d5db", fontStyle: "italic" }}>—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Faculty Details Table */}
          {timetable.facultyDetails && timetable.facultyDetails.length > 0 && (
            <div>
              <h3 style={{ marginBottom: "15px", color: "#1f2937" }}>📋 Faculty Details</h3>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  backgroundColor: "white",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: "#1f2937", color: "white" }}>
                    <th style={{ padding: "12px", textAlign: "left", fontWeight: "bold" }}>
                      Subject Code
                    </th>
                    <th style={{ padding: "12px", textAlign: "left", fontWeight: "bold" }}>
                      Subject Name
                    </th>
                    <th style={{ padding: "12px", textAlign: "left", fontWeight: "bold" }}>
                      Faculty Name
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {timetable.facultyDetails.map((faculty, idx) => (
                    <tr
                      key={idx}
                      style={{
                        backgroundColor: idx % 2 === 0 ? "#f9fafb" : "white",
                        borderBottom: "1px solid #e5e7eb"
                      }}
                    >
                      <td
                        style={{
                          padding: "12px",
                          fontWeight: "bold",
                          color: "#1f2937"
                        }}
                      >
                        {faculty.subjectCode}
                      </td>
                      <td style={{ padding: "12px", color: "#374151" }}>
                        {faculty.subjectName}
                      </td>
                      <td style={{ padding: "12px", color: "#374151" }}>
                        {faculty.facultyName}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TimetableView;
