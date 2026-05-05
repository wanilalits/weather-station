
import React from 'react';
import Dashboard from './components/Dashboard'
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";




const App: React.FC = () => {
  
   const isAuth: string | null = localStorage.getItem("token");
  return (
     <Routes>
      {/* Default route */}
      <Route
        path="/"
        element={
          isAuth ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
        }
      />

      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* Protected */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
    
  );
};

export default App;
