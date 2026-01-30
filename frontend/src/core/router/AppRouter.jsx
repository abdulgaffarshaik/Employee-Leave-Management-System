import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "../guards/ProtectedRoute";

import Login from "../../modules/auth/pages/Login";
import Register from "../../modules/auth/pages/Register";
import ForgotPassword from "../../modules/auth/pages/ForgotPassword";

import EmployeeDashboard from "../../modules/employee/pages/Dashboard";
import ApplyLeave from "../../modules/employee/pages/ApplyLeave";
import LeaveHistory from "../../modules/employee/pages/LeaveHistory";

import ManagerDashboard from "../../modules/manager/pages/Dashboard";


import AdminDashboard from "../../modules/admin/pages/Dashboard";


import NotFound from "../../pages/NotFound";

const AppRouter = () => {
  return (
    <Routes>

      {/* Default Redirect */}
      <Route path="/" element={<Navigate to="/login" />} />

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      <Route element={<DashboardLayout />}>
        <Route
          path="/employee/dashboard"
          element={
            <ProtectedRoute role="employee">
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/apply-leave"
          element={
            <ProtectedRoute role="employee">
              <ApplyLeave />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/history"
          element={
            <ProtectedRoute role="employee">
              <LeaveHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager/dashboard"
          element={
            <ProtectedRoute role="manager">
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
