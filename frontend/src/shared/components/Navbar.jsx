import { useAuth } from "../../modules/auth/store/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { toggleTheme } = useTheme();

  return (
    <div className="navbar">
      <h3>TEAM PRIDE ELMS</h3>
      <div>
        
        <button onClick={toggleTheme}>Theme</button>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
