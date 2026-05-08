import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CustomTextBox from './TextBox';
import ErrorMessage from "./ErrorMessage";
const Login: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userIDerrorText, setUserIDerror] = useState<string>("");
  const [passworderrorText, setPassworderrorText] = useState<string>("");
  // useEffect dependency on isAgeValid
 useEffect(() => {
const token = localStorage.getItem("token");

    // If token exists
    if (token) {
      navigate("/dashboard");
    }

  
  
    
  }, []);


  const handleLogin = () => {
    // dummy validation
   if(!username){
setUserIDerror("Username should not be empty")
}

  else if(!password){
setPassworderrorText("Password should not be empty")
}
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
        setValuer={setUsername}
        placeholder="Enter ID"
        type="text"
     lableText="User ID"
     errorText= {username ? "" : "Username should not be empty"}
     />
      </div>

        {/* Password */}
        <div className="mb-6">
         <CustomTextBox
        value={password}
        setValuer={setPassword}
        placeholder="Enter Password"
        type="text"
         lableText="Password"
     errorText=  {password ? "" : "Password should not be empty"}
      />
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full  bg-[#007498] text-white py-2 rounded-lg font-semibold hover:bg-[#015e7a] transition duration-300"
        >Login
        </button>
        <br></br>
            <br></br>
<h2 className="text-black text-base mb-0 text-center">
  Forgot{" "}
  <a href="" className=" text-[#015e7a]   hover:underline   cursor-pointer " > Username / Password? </a>
</h2>
     
<h2 className="text-black text-base mb-0 
text-center">
    Don't have an account?{" "}
  <a href="" className=" text-[#015e7a]   hover:underline   cursor-pointer " > Sign up </a>
</h2>

    
      </div>
    </div>
  );
};

export default Login;