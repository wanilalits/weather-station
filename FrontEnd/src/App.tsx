


import {BrowserRouter, Routes,  Route, Navigate } from "react-router-dom";
import WeatherDashboard from './pages/WeatherDashboard'
import Login from "./pages/Login";
import ProtectedRoute from './routes/ProtectedRoute'
import {useWebSocket} from "./hooks/useWebSocket";


const App: React.FC = () => { 
    const loginToken = localStorage.getItem("loginToken");
    useWebSocket(); // Runs once when App mounts
   return (
      <BrowserRouter>
    <Routes>
      {/* Default route */}
    <Route path="/"       
    element={loginToken ? <Navigate to="/weatherdashboard" replace /> : <Navigate to="/login" replace />}/>
     
      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* Protected */}
      <Route
        path="/weatherdashboard"
        element={
          <ProtectedRoute>
            <WeatherDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
    </BrowserRouter>
  );
};

export default App;
