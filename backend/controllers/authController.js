import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { validatePassword } from "../utils/passwordValidator.js";

export const register = async (req, res) => {
  try {
    const { name, employeeId, email, password, role, designation } = req.body;

    if (!validatePassword(password)) {
      return res.status(400).json({ message: "Weak password format" });
    }

    if (await User.findOne({ employeeId })){
      return res.status(400).json({ message: "Employee ID already exists" });
    }
    if (await User.findOne({ email })){
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      employeeId,
      email,
      password: hashed,
      role,
      designation: role === "admin" ? null : designation
    });

    res.status(201).json({
      token: generateToken(user),
      user: { id: user._id, name: user.name, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: "Registration failed" });
  }
};

export const login = async (req, res) => {
  try {
    const { employeeId, email, password } = req.body;

    const user = await User.findOne({
      $or: [{ employeeId }, { email }]
    });

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      token: generateToken(user),
      user: { id: user._id, name: user.name, role: user.role }
    });
  } catch {
    res.status(500).json({ message: "Login failed" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { employeeId, newPassword } = req.body;

    if (!validatePassword(newPassword))
      return res.status(400).json({ message: "Weak password format" });

    const user = await User.findOne({ employeeId });
    if (!user) return res.status(404).json({ message: "Employee not found" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch {
    res.status(500).json({ message: "Reset failed" });
  }
};
