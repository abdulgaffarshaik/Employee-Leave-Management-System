import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    employeeId: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["employee", "manager", "admin"],
      required: true
    },
    designation: {
      type: String, // software developer, ai engineer, etc.
      default: null
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
