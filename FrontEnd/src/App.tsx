


import {BrowserRouter, Routes,  Route} from "react-router-dom";
import WeatherDashboard from './pages/WeatherDashboard'
import Login from "./pages/Login";
import ProtectedRoute from './routes/ProtectedRoute'


const App: React.FC = () => { 
  
   
   return (
      <BrowserRouter>
    <Routes>
      {/* Default route */}
    <Route path="/" element={<Login />} />
     
      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* Protected */}
      <Route
        path="/WeatherDashboard"
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
