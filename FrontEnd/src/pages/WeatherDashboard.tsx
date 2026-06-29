import { useState, useEffect } from 'react';
import { Droplets, Gauge } from 'lucide-react';
import type { RootState } from '../features/store';
import {  useSelector } from 'react-redux';


import Graph from '../components/Graph'
import Header from '../components/TopHeader';
import TimeRangeBar from '../components/TimeRangeBar'
const hourlyData = [
  { time: 'Now', temp: 24, icon: '🌤️' },
  { time: '9 AM', temp: 22, icon: '⛅' },
  { time: '10 AM', temp: 23, icon: '☀️' },
  { time: '11 AM', temp: 24, icon: '☀️' },
  { time: '12 PM', temp: 25, icon: '☀️' },
  { time: '1 PM', temp: 26, icon: '☀️' },
];

const weeklyData = [
  { day: 'Today', weather: 'Partly Cloudy', low: 18, high: 26, icon: '⛅' },
  { day: 'Tue', weather: 'Sunny', low: 17, high: 28, icon: '☀️' },
  { day: 'Wed', weather: 'Cloudy', low: 16, high: 24, icon: '☁️' },
  { day: 'Thu', weather: 'Rain', low: 14, high: 20, icon: '🌧️' },
  { day: 'Fri', weather: 'Storm', low: 15, high: 21, icon: '⛈️' },
  { day: 'Sat', weather: 'Sunny', low: 16, high: 23, icon: '☀️' },
  { day: 'Sun', weather: 'Partly Cloudy', low: 17, high: 24, icon: '⛅' },
];



export default function WeatherDashboard() {  
const [time, setTime] = useState(new Date());
 
const deviceData = useSelector((state: RootState) => state.device);

//updateDevicesamples
//console.log(deviceData.devices1[1][deviceData.devices1[1].length-1].tempAHT)
//console.log(deviceData.devices1[1].length-1)

useEffect(() => {
  const updateTime = () => setTime(new Date());
  // Update immediately
  updateTime();
  // Milliseconds until the next minute
  const now = new Date();
  const delay = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
  let interval :any;
  const timeout = setTimeout(() => {
    updateTime();
    // Then update every minute
    interval = setInterval(updateTime, 60000);
  }, delay);

  return () => {
    clearTimeout(timeout);
    clearInterval(interval);
  };
}, []);













  return (
    <>
  
      <div className="min-h-screen bg-gray-100 flex">
        {/* Sidebar */}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 space-y-6 overflow-auto">
          {/* Header */}
            Page Under Developement
          <Header />

          {/* Hero Section */}
          <section className="flex flex-col xl:flex-row gap-4 ">
            <div className=" max-w-[380px] bg-gradient-to-r from-blue-600  to-indigo-600 text-white rounded-2xl p-8 shadow-lg">
              <p className="text-lg opacity-90">India, Maharashtra</p>
              <p className="opacity-75"> {time.toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit',  hour12: true, })}</p>
              <div className="flex items-start gap-1 mt-3 ">
                <div className="text-7xl  -ml-4 ">🌤️</div>
                <div><h3 className="text-6xl font-semibold">
  {deviceData.devices1[1]?.at(-1)?.tempAHT ?? 27} °C
</h3></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 w-full ">
                <div>
  <p className="text-sm opacity-80 whitespace-nowrap">Humidity</p>
  <p className="font-semibold flex items-center gap-1">
    <Droplets size={16} className="text-white shrink-0" /> <span>60%</span>
  </p>
</div>

                <div>
  <p className="text-sm opacity-80 whitespace-nowrap">Air Pressure</p>
  <p className="font-semibold flex items-center gap-2  whitespace-nowrap">

   <Gauge size={16} className="text-white shrink-0" /> <span  > 1015 hPa</span>
  </p>
</div>
  </div >

 <p className="opacity-75 text-1xl font-light mt-2"> Last Updated at {time.toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit',  hour12: true, })}</p>
<p className="opacity-75 text-1xl font-light"> Last Chacked before 2 minuits</p>
            </div>

            <div className="flex-1 flex flex-col bg-white ">
           <TimeRangeBar />
              <Graph/>
            </div>
          </section>

          {/* Hourly Forecast */}
          <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-2xl font-semibold mb-6">Hourly Forecast</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {hourlyData.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl p-4 text-center">
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
                  <div key={index} className="grid grid-cols-4 items-center border-b border-gray-100 pb-3 last:border-none">
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
              <p className="text-sm text-gray-500 text-center mt-2">Air quality is satisfactory and poses little or no risk.</p>
            </div>
          </section>
        
        </main>
      </div>
      ggggggggg
    </>
  );
}
