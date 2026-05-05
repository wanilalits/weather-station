import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    // dummy validation
    if (username && password) {
      localStorage.setItem("token", "my-token");
      navigate("/dashboard");
    }
  };

  return (
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        {/* Username */}
        <div className="mb-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
        >
          Login
        </button>

      </div>
    </div>
  );
};

export default Login;