import { Navigate } from "react-router-dom";
import { useAuth } from "../../modules/auth/store/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  if (role && user.role !== role) return <Navigate to="/not-found" />;

  return children;
};

export default ProtectedRoute;
