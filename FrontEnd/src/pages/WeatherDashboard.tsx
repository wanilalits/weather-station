import {  useEffect } from 'react';
import {Bell, CloudSun, Droplets, Gauge, MapPin, Search,Sun,Wind,} from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../features/authSlice";
import type { RootState } from '../features/store';
import { useNavigate } from 'react-router-dom';
const hourlyData = [
  { time: "Now", temp: 24, icon: "🌤️" },
  { time: "9 AM", temp: 22, icon: "⛅" },
  { time: "10 AM", temp: 23, icon: "☀️" },
  { time: "11 AM", temp: 24, icon: "☀️" },
  { time: "12 PM", temp: 25, icon: "☀️" },
  { time: "1 PM", temp: 26, icon: "☀️" },
];

const weeklyData = [
  { day: "Today", weather: "Partly Cloudy", low: 18, high: 26, icon: "⛅" },
  { day: "Tue", weather: "Sunny", low: 17, high: 28, icon: "☀️" },
  { day: "Wed", weather: "Cloudy", low: 16, high: 24, icon: "☁️" },
  { day: "Thu", weather: "Rain", low: 14, high: 20, icon: "🌧️" },
  { day: "Fri", weather: "Storm", low: 15, high: 21, icon: "⛈️" },
  { day: "Sat", weather: "Sunny", low: 16, high: 23, icon: "☀️" },
  { day: "Sun", weather: "Partly Cloudy", low: 17, high: 24, icon: "⛅" },
];

const StatCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
    <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
      {icon}
      <span>{label}</span>
    </div>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </div>
);








export default function WeatherDashboard() {
const { userName: user,  loginToken } = useSelector((state: RootState) => state.auth);
const dispatch = useDispatch();
const navigate = useNavigate();
 
  const logOut=()=>{
dispatch(logout());
 localStorage.removeItem("loginToken");
}


 useEffect(() => { //handle Login Success
  if (loginToken===null) {
   navigate('/');
  }
}, [loginToken]);
  
 
 

 
  return (
   <>
   <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-gray-200 p-6 hidden lg:flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <CloudSun className="text-blue-500" size={32} />
          <h1 className="text-2xl font-bold">Weatherly</h1>
        </div>

        <nav className="space-y-2">
          {[
            "Overview",
            "Forecast",
            "Maps",
            "Alerts",
            "Favorites",
            "Settings",
          ].map((item, index) => (
            <button
              key={index}
              className={`w-full text-left px-4 py-3 rounded-xl transition ${
                item === "Overview"
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="mt-auto bg-blue-50 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin size={16} />
            New York, USA
          </div>
          <button className="text-blue-600 text-sm mt-2 font-medium">
            Update location
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 space-y-6 overflow-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-4xl font-bold text-gray-900">
              Good morning, {user} 👋
            </h2>
            <p className="text-gray-500 mt-1">Page Under Developement</p>
          </div>

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
        </header>

        {/* Hero Section */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl p-8 shadow-lg">
            <p className="text-lg opacity-90">New York, USA</p>
            <p className="opacity-75">Monday, 11 May</p>

            <div className="flex items-center gap-6 mt-6">
              <div className="text-7xl">🌤️</div>
              <div>
                <h3 className="text-6xl font-bold">24°C</h3>
                <p className="text-xl mt-1">Partly Cloudy</p>
                <p className="opacity-80">Feels like 26°C</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div>
                <p className="text-sm opacity-80">Humidity</p>
                <p className="font-semibold">60%</p>
              </div>
              <div>
                <p className="text-sm opacity-80">Wind</p>
                <p className="font-semibold">12 km/h</p>
              </div>
              <div>
                <p className="text-sm opacity-80">Sunrise</p>
                <p className="font-semibold">5:45 AM</p>
              </div>
              <div>
                <p className="text-sm opacity-80">Sunset</p>
                <p className="font-semibold">8:15 PM</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <StatCard
              icon={<Droplets size={16} className="text-blue-500" />}
              label="Humidity"
              value="60%"
            />
            <StatCard
              icon={<Wind size={16} className="text-green-500" />}
              label="Wind Speed"
              value="12 km/h"
            />
            <StatCard
              icon={<Gauge size={16} className="text-orange-500" />}
              label="Air Pressure"
              value="1015 hPa"
            />
            <StatCard
              icon={<Sun size={16} className="text-yellow-500" />}
              label="UV Index"
              value="5 Moderate"
            />
          </div>
        </section>

        {/* Hourly Forecast */}
        <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-2xl font-semibold mb-6">Hourly Forecast</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {hourlyData.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-4 text-center"
              >
                <p className="text-sm text-gray-500">{item.time}</p>
                <div className="text-3xl my-2">{item.icon}</div>
                <p className="text-xl font-semibold">{item.temp}°</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Grid */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* 7-Day Forecast */}
          <div className="xl:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-2xl font-semibold mb-6">7-Day Forecast</h3>
            <div className="space-y-4">
              {weeklyData.map((day, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 items-center border-b border-gray-100 pb-3 last:border-none"
                >
                  <span className="font-medium">{day.day}</span>
                  <span>
                    {day.icon} {day.weather}
                  </span>
                  <span className="text-gray-500">{day.low}°</span>
                  <span className="font-semibold text-right">{day.high}°</span>
                </div>
              ))}
            </div>
          </div>

          {/* Air Quality */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-2xl font-semibold mb-4">Air Quality</h3>
            <div className="flex items-center justify-center w-32 h-32 rounded-full border-8 border-green-400 mx-auto text-center">
              <div>
                <p className="text-3xl font-bold">32</p>
                <p className="text-sm text-gray-500">AQI</p>
              </div>
            </div>
            <p className="text-center text-green-600 font-semibold mt-4">Good</p>
            <p className="text-sm text-gray-500 text-center mt-2">
              Air quality is satisfactory and poses little or no risk.
            </p>
          </div>
        </section>
      </main>
    </div>

    </>
  );
}
