import mongoose from "mongoose";

const timetableSchema = new mongoose.Schema(
  {
    // Academic Info
    academicYear: { type: String, required: true }, // e.g., "2025-26"
    semester: { type: Number, required: true }, // e.g., 2
    class: { type: String, required: true }, // e.g., "III B.TECH"
    section: { type: String, required: true }, // e.g., "B"
    room: { type: String }, // e.g., "B-206"
    classTeacher: { type: String }, // e.g., "Mrs.V.Ramya"

    // Timetable grid: [{ day, timeSlot, subject, faculty }]
    schedule: [
      {
        day: {
          type: String,
          enum: ["MON", "TUE", "WED", "THU", "FRI", "SAT"],
          required: true
        },
        timeSlot: { type: String, required: true }, // e.g., "08:00-8:50"
        subject: { type: String }, // e.g., "EPHT"
        faculty: { type: String }, // e.g., "Mr.K.Ravi Kumar"
        room: { type: String } // Optional: specific room for this class
      }
    ],

    // Faculty details: [{ code, subjectName, facultyName }]
    facultyDetails: [
      {
        subjectCode: { type: String, required: true }, // e.g., "EPHT"
        subjectName: { type: String, required: true }, // e.g., "Ethical Hacking..."
        facultyName: { type: String, required: true }, // e.g., "Mr.K.Ravi Kumar"
        facultyId: { type: mongoose.Schema.Types.ObjectId, ref: "User" } // Link to user
      }
    ],

    // Who created/manages this
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Timetable", timetableSchema);
