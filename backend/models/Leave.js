import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    replacementEmployee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    reason: { type: String, required: true },

    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },

    description: String,

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Leave", leaveSchema);
