import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    employeeId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["employee", "manager", "admin"],
      required: true
    },
    designation: { type: String, default: null },

    leaveBalance: { type: Number, default: 4 },
    usedLeavesThisMonth: { type: Number, default: 0 },
    lastLeaveReset: { type: Date, default: new Date() }
  },
  { timestamps: true }
);


export default mongoose.models.User || mongoose.model("User", userSchema);
