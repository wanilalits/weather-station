import { Menu, X, Bell, Search, Settings,BookOpen } from 'lucide-react';
//import { useDispatch, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';
//import type { RootState } from '../features/store';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const Header: React.FC = ({}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  //const { userName: user,  } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(logout());
    localStorage.removeItem('loginToken');
    navigate('/');
  };

  return (
    <header className="bg-white  rounded-lg p-1 px-3 shadow-sm">
      {/* Top Row - Always Single Line */}
      <div className="flex items-center w-full ">
            {/* Logo */}
        <div className=" flex items-center gap-2 shrink-0">
          <img src="https://img.icons8.com/color/48/partly-cloudy-day.png" alt="logo" className="w-10 h-10" />
          <h1 className="text-xl font-bold text-[#007498]">AtmosIQ</h1>
        </div>

        {/* Middle Menu */}
        <div className="hidden md:flex items-center gap-6  justify-center w-full overflow-x-auto">
         
        <div className="hidden min-[990px]:block relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 " />
            <input type="text" placeholder="Search city..." className="pl-10 pr-4 py-1 border rounded-lg " />
          </div>
<div className="flex items-center gap-2 text-gray-400 hover:text-black cursor-pointer transition-colors duration-200"><Settings  /><span>Setting</span></div>
<div className="flex items-center gap-2 text-gray-400 hover:text-black cursor-pointer transition-colors duration-200"> <Bell/>Notifications</div>
 <div className="flex items-center gap-2 text-gray-400 hover:text-black cursor-pointer transition-colors duration-200"> <BookOpen/>Blog</div>       

</div>

         {/* Right Side Menu */}
        <div className="hidden md:flex items-center gap-4 justify-end ">
          <img src="https://i.pravatar.cc/40" alt="profile" className="w-10 h-10 rounded-full" />

          <button onClick={logOut} className="px-4 py-2 bg-[#007498] text-white rounded-lg">
            Logout
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden  ml-auto" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}</button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-4 border-t pt-4 flex flex-col gap-4 ">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Search city..." className="w-full pl-10 pr-4 py-2 border rounded-lg" />
          </div>

          <button className="flex items-center gap-2">
            <Bell size={18} />
            Notifications
          </button>

          <button className="flex items-center gap-2">
            <Settings size={18} />
            Settings
          </button>

          <div className="flex items-center gap-2">
            <img src="https://i.pravatar.cc/40" alt="profile" className="w-8 h-8 rounded-full" />
            Profile
          </div>

          <button onClick={logOut} className="bg-[#007498] text-white py-2 rounded-lg">
            Logout
          </button>
        </div>
      )}

    </header>
  );
};

export default Header;
