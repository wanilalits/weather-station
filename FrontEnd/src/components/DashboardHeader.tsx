//import { useEffect, useRef, useState } from 'react';
import userIcon from '../assets/Images/user.svg';
import notificationIcon from '../assets/Images/notification.svg';
import { useSelector } from 'react-redux';
import {formatISTDate  } from '../utils/formatDate';
export default function DashboardHeader() {
   const devices = useSelector((state: any) => state.device.devices);
 //formatDate(devices)
//console.log ( formatISTDate(devices))
   //console.log (devices[1]?.[0]?.timestampFront)
 const time = formatISTDate(devices[1]?.[0]?.timestampFront)
  return (
    <div>
     <div className="flex justify-between items-center mb-6">
  <h1 className="text-2xl font-semibold">Weather Today</h1>
  <div className="flex items-center gap-4">
    <input  placeholder="Search"  className="px-4 py-2 rounded-lg border"/>
 {/* 👤 User */}
    <div className="w-6 h-6 rounded-full border flex items-center justify-center overflow-hidden bg-gray-200">
      <img src={userIcon} className="w-full h-full object-cover" />
    </div>
    {/* 🔔 Notification */}
    <div className="relative">
      <img src={notificationIcon} className="w-6 h-6 cursor-pointer" />
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
        5
      </span>
    </div>
  </div>
</div>
<div style={{display: "inline-block",padding: "6px 12px",borderRadius: "8px",background: "#f5f7fa",fontSize: "12px",color: "#555",border: "1px solid #e0e0e0"}}>
  ⏱ Last updated: {time}
</div>
</div>
  );
}