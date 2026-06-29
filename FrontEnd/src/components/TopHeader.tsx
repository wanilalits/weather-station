import {Bell,  Search, Settings } from "lucide-react";
//import { useDispatch, useSelector } from 'react-redux';
import { useDispatch,  } from 'react-redux';
import { logout } from "../features/authSlice";
//import type { RootState } from '../features/store';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = ({  }) => {

  //const { userName: user,  } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
   
    const logOut=()=>{
  dispatch(logout());
   localStorage.removeItem("loginToken");
   navigate('/');
  }
  
  
    return (
    <>  
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-2 rounded-lg">
          
          
 <div className="flex items-center gap-3">
    <img
      src="https://img.icons8.com/color/48/partly-cloudy-day.png"
      alt="AtmosIQ Logo"
      className="w-10 h-10"
    />
    <h1 className="text-2xl font-bold text-blue-700">
      AtmosIQ
    </h1>
  </div>


    <Settings className="w-6 h-6 text-back" />

           {/*
          <div>
            <h2 className="text-4xl font-bold text-gray-900">
              Good morning, {user} 👋
            </h2>
            <p className="text-gray-500 mt-1">Page Under Developement</p> 
         Weather Insight Pro
          </div>
*/}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search city..."
                className="pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white w-72 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Bell className="text-gray-600" />
      
            <img
              src="https://i.pravatar.cc/40"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
<button onClick={()=>{logOut()}} className="w-full  bg-[#007498] text-white py-2.5 rounded-lg font-semibold hover:bg-[#015e7a] cursor-pointer transition duration-300">
         LogOut
        </button>

          </div>
        </header></>
  )
}

export default Header;