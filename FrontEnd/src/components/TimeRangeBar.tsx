import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { deviceDataRequest, clearDeviceData } from '../features/deviceDataSlice';
import {graphinfo} from '../features/graphSlice';
import {getUTCStartDate} from '../utils/formatDate'
export default function TimeRangeBar() {
const [range, setRange] = useState("1M");
const dispatch = useDispatch();
const now = new Date();
let startdate:string, enddate:string
const getInitialData = () => {dispatch(deviceDataRequest({deviceid: "1", startdate, enddate,limit: 100, authToken:  localStorage.getItem("loginToken")|| "not available" }));};
const clearData = ()=>{dispatch(clearDeviceData());}
const graphMode = () => {dispatch(graphinfo({GraphType: "line", range: range}));};  
useEffect(() => {
clearData()
startdate =  getUTCStartDate(range)
console.log(startdate)
enddate = now.toISOString();
 getInitialData()
 graphMode()
},[range]);





return (
    <div className="p-1">
      <div className="flex flex-wrap items-center gap-1 justify-between"> 
        <div className="flex flex-wrap gap-2 font-thin">
        {["live", "24Hr", "7D", "1M", "1Y", "max", "custom"].filter(item => !(range === "custom" && item === "custom"))
.map((item, _id) => (
    <> 
    {_id ===0 ? null : <>|</>} 
    <button key={item}  onClick={() => setRange(item)} 
    className={`px-3 py-1 rounded-lg text-sm font-medium 
    transition${range === item? " text-blue-600  hover:bg-gray-200 font-semibold" : "text-gray-100  hover:bg-gray-200 font-light "  }`}>
      {item.charAt(0).toUpperCase() + item.slice(1)}
    </button> </>
  ))}
          {range==="custom" && <>
        <input
            type="datetime-local"
            className="border rounded-lg px-2 py-1 text-sm"
          />
          <span>to</span>
          <input
            type="datetime-local"
            className="border rounded-lg px-2 py-1 text-sm"
          />
          <button className="bg-indigo-600 text-white px-3 py-1 rounded-lg">
            Apply
          </button>
        </>
       }
        </div>
      </div>
    </div>
  );
}