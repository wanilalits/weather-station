import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import CustomTextBox from './TextBox';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userIdError, setUserIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
const [showPassword, setShowPassword] = useState(false);
  const userRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  

  

  // useEffect dependency on isAgeValid
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    } else {
      setLoading(false);
      ///focusPassword();
    }
  }, [navigate]);

  // useEffect dependency on isAgeValid
 useEffect(() => {
  if (!loading) {
    userRef.current?.focus();
  }
}, [loading]);

 
  // Prevent login form flash
  if (loading) {
    return null;
  }

  const validateUsername = (value: string) => {
    const usernamePattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!value) {
      userRef.current?.focus();
      return 'Userid should not be empty';
         
    }
    if (!usernamePattern.test(value)) {
         userRef.current?.focus();
      return 'Userid should match emailid@gmail.com';
       
    }
    return '';
  };

  const validatePassword = (value: string) => {
  
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{12,}$/;
    if (!value) {
      passwordRef.current?.focus();
      return 'Password should not be empty';
    }
    if (!passwordPattern.test(value)) {
      passwordRef.current?.focus();
      return 'Password must be at least 12 characters and include uppercase, lowercase, number, and symbol';
    }
    return '';
  };

  const handleLogin = () => {
    const passwordValidationError = validatePassword(password);
    const usernameValidationError = validateUsername(username);
    

    setUserIdError(usernameValidationError);
    setPasswordError(passwordValidationError);

    if (!usernameValidationError && !passwordValidationError) {
      localStorage.setItem('token', 'my-token');
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>

        {/* Username */}
        <div className="mb-4">
          <CustomTextBox ref={userRef} value={username} setValuer={setUsername} placeholder="Enter ID" lableText="User ID" errorText={userIdError} />
        </div>

        {/* Password */}
        <div className="mb-6">
          <CustomTextBox ref={passwordRef} value={password} setValuer={setPassword}  type={showPassword ? "text" : "password"} placeholder="Enter Password" lableText="Password" errorText={passwordError} />
        <input
    type="checkbox"
    checked={showPassword}
    onChange={(e) =>
      setShowPassword(e.target.checked)
    }
    className="mr-2 cursor-pointer"
  />

  <label className="text-sm text-gray-700">
    Show Password
  </label>
        </div>

        {/* Button */}
        <button onClick={handleLogin} className="w-full  bg-[#007498] text-white py-2 rounded-lg font-semibold hover:bg-[#015e7a] transition duration-300">
          Login
        </button>
        <br></br>
        <br></br>
        <h2 className="text-black text-base mb-0 text-center">
          Forgot{' '}
          <a href="" className=" text-[#015e7a]   hover:underline   cursor-pointer ">
            {' '}
            Username / Password?{' '}
          </a>
        </h2>

        <h2
          className="text-black text-base mb-0 
text-center"
        >
          Don't have an account?{' '}
          <a href="" className=" text-[#015e7a]   hover:underline   cursor-pointer ">
            {' '}
            Sign up{' '}
          </a>
        </h2>
        <br></br> 
        <p className="text-slate-500 text-xs mt-1">
             UserId: user@gmail.com
            </p>
            <p className="text-slate-500 text-xs mt-1">
             password: Password@123
            </p>
      </div>
    </div>
  );
};

export default Login;
