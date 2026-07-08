

import React, { useEffect, useState } from "react";
import {BrowserRouter, Routes,  Route, Navigate } from "react-router-dom";
import WeatherDashboard from './pages/WeatherDashboard'
import Login from "./pages/Login";
import ProtectedRoute from './routes/ProtectedRoute'
import {useWebSocket} from "./hooks/useWebSocket";
import { tokenVerification} from './services/tokenVerification'

const App: React.FC = () => { 
   const [authStatus, setAuthStatus] = useState<"checking" | "authenticated" | "unauthenticated" >("checking");
 useWebSocket(); // Runs once when App mounts  
   
    useEffect(() => {
    const checkAuth = async () => {
      try {
    const loginToken = localStorage.getItem("loginToken");
      if (!loginToken) {
        setAuthStatus("unauthenticated");
        return;
      }
await tokenVerification({loginToken});
  
setAuthStatus("authenticated");
      
      } 
      catch (error) {
  
       localStorage.removeItem("loginToken");
        setAuthStatus("unauthenticated");
      }
    };
    checkAuth();
  }, []);

  if (authStatus === "checking") {
    return <div>Loading...</div>;
  }
   
   
   
    return (
      <BrowserRouter>
    <Routes>
      {/* Default route */}
    <Route path="/"       
    element={authStatus==="authenticated" ? <Navigate to="/weatherdashboard" replace /> : <Navigate to="/login" replace />}/>
     
      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* Protected */}
      <Route path="/weatherdashboard" element={ <ProtectedRoute> <WeatherDashboard />  </ProtectedRoute>
        }
      />
    </Routes>
    </BrowserRouter>
  );
};

export default App;
