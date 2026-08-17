import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import CustomTextBox from '../components/TextBox';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../features/authSlice';
import type { RootState } from '../features/store';

const Login: React.FC = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userIdError, setUserIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginErrorr] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const userRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const { loading,  error, loginToken } = useSelector((state: RootState) => state.auth);



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
    const usernameValidationError = validateUsername(email);
    const passwordValidationError = validatePassword(password);

    setUserIdError(usernameValidationError);
    setPasswordError(passwordValidationError);

    if (!usernameValidationError && !passwordValidationError) {
      console.log('✅ Validation passed, dispatching login request...');
      setLoginErrorr('');
      dispatch(loginRequest({ email, password }));
    }
  }; 

  const tokenvarification = ()=>{
    const loginToken = localStorage.getItem("loginToken");
    if (loginToken!== null) {
    console.log (loginToken)
  }
  }

useEffect(() => { //handle Login Success
  if (loginToken) {
    localStorage.setItem('loginToken', loginToken);
     tokenvarification()

  navigate('/WeatherDashboard');
  }
}, [loginToken, navigate]);




useEffect(() => { //  handle Login Failure massage
  if (error && !loginToken) {
    if (error === 'Login failed') {
      setLoginErrorr('Problem while fetching records');
    } else if (error === 'Failed to fetch') {
      setLoginErrorr('Connection problem');
    } else {
      setLoginErrorr('Problem occurred while login, please try again later');
    }
  }
}, [error, loginToken]);

  return (
    <div className="min-h-dvh flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm  bg-white p-8 rounded-2xl shadow-xl border border-gray-200 mx-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">Login</h2>
        {/* Username */}
        <div className="mb-4">
          <CustomTextBox ref={userRef} value={email} setValuer={setEmail} placeholder="Enter ID" lableText="User ID" errorText={userIdError} />
        </div>

        {/* Password */}
        <div className="mb-4">
          <CustomTextBox ref={passwordRef} value={password} setValuer={setPassword} type={showPassword ? 'text' : 'password'} placeholder="Enter Password" lableText="Password" errorText={passwordError} />
          <div className="flex items-center gap-1 mt-2">
            <input type="checkbox" checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)} className="mr-2 cursor-pointer" />

            <label className="text-sm text-gray-700">Show Password</label>
          </div>
        </div>

        {/* Button */}
        <button onClick={() => handleLogin()} disabled={loading} className="w-full  bg-[#007498] text-white py-2.5 rounded-lg font-semibold hover:bg-[#015e7a] cursor-pointer transition duration-300">
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {loading ? '' : <p className="text-red-500 text-xs mt-1">{loginError}</p>}
    
        <h2 className="text-black text-base mb-0 text-center ">
          Forgot{' '}
          <a href="" className=" text-[#015e7a]   hover:underline   cursor-pointer ">
            {' '}
            Username / Password?{' '}
          </a>
        </h2>

        <h2
          className="text-black text-base mb-0 text-center"
        >
          Don't have an account?{' '}
          <a href="" className=" text-[#015e7a]   hover:underline   cursor-pointer ">
            {' '}
            Sign up{' '}
          </a>
        </h2>
        <br></br>
        <p className="text-slate-500 text-xs mt-1">Userid: user@gmail.com</p>
        <p className="text-slate-500 text-xs mt-1">password: Aq7@m2n8p4Xs</p>
      </div>
    </div>
  );
};

export default Login;
