import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CustomTextBox from './TextBox';




const Login: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // useEffect dependency on isAgeValid
 useEffect(() => {
    // Validate age whenever isAgeValid changes
  
    console.log( username);
    
  }, [username]);


  const handleLogin = () => {
    // dummy validation
    if (username && password) {
      localStorage.setItem("token", "my-token");
      navigate("/dashboard");
    }
  };




  return (

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
       <div className="w-full max-w-sm mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
        
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        {/* Username */}
        <div className="mb-4">
      <CustomTextBox
        value={username}
        setValue={setUsername}
        placeholder="Enter name"
        type="text"
        width="250px"
      />
        </div>

        {/* Password */}
        <div className="mb-6">
         <CustomTextBox
        value={password}
        setValue={setPassword}
        placeholder="Enter Password"
        type="text"
        width="250px"
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