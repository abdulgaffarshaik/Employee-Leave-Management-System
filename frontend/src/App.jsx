import React from "react";
import AppRouter from "./core/router/AppRouter";
import { AuthProvider } from "./modules/auth/store/AuthContext";
import { ThemeProvider } from "./shared/context/ThemeContext";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="app-root">
          <AppRouter />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
