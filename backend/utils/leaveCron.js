import User from "../models/user.js";

export const monthlyLeaveReset = async () => {
  const users = await User.find({ role: "employee" });
  const now = new Date();

  for (const user of users) {
    const last = new Date(user.lastLeaveReset);

    // New month detected
    if (
      now.getMonth() !== last.getMonth() ||
      now.getFullYear() !== last.getFullYear()
    ) {
      user.leaveBalance += 4; // carry forward + new month
      user.usedLeavesThisMonth = 0;
      user.lastLeaveReset = now;

      await user.save();
    }
  }
};
