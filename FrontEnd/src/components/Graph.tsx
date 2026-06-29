import {useState, useEffect} from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend,} from "recharts";
import type { RootState } from '../features/store';
import {  useSelector } from 'react-redux';
export default function Graph() { 
const [visible, setVisible] = useState({humidity: true,tempAHT: true,});
const device =  useSelector((state: RootState) => state.device)
const graphMode =  useSelector((state: RootState) => state.graphMode);
const deviceData= useSelector((state: RootState) => state.DeviceData);

const sourceData =
  graphMode.range === "live" ? device.devices1[1] : deviceData;

const chartData = sourceData?.map((item: any) => ({
  time: new Date(item.time).getTime(),
  humidity: item.humidity ?? null,
  tempAHT: item.tempAHT ?? null,
})) ?? [];

const minTime = Math.min(...chartData.map((d:any) => d.time));
const maxTime = Math.max(...chartData.map((d:any) => d.time));
const numberOfLabels = 10;
const ticks = Array.from( { length: numberOfLabels },
 (_, i) => minTime +  ((maxTime - minTime) * i) / (numberOfLabels - 1));

const toggleLine = (e:any) => {
  const key = e.dataKey;

  setVisible((prev) => ({
    ...prev,
    [key]:  !prev[key as keyof typeof prev],
  }));
};


useEffect(() => {
console.log(graphMode)
console.log(device.devices1[1])
console.log(deviceData)
}, [ deviceData]);


  return (
    //flex flex-wrap items-center gap-2 justify-between
   <div className="h-full shadow-lg p-1 flex flex-wrap items-center gap-1 justify-between
  [&_.recharts-wrapper]:outline-none [&_.recharts-wrapper_svg]:outline-none [&_*:focus]:outline-none
  ">
  <ResponsiveContainer width="100%" height={250}  >
  <LineChart data={chartData} >
    

    <XAxis
       dataKey="time"
  type="number"
  domain={[minTime, maxTime]}
  ticks={ticks}
      tickFormatter={(value) =>
        new Date(value).toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          hour: "numeric",
          minute: "2-digit",
          hour12: true
        })
      }
    />

  <YAxis domain={['dataMin - 1', 'dataMax + 1']} 
   
  tickFormatter={(value) => Number(value).toFixed(2)}
  />

    <Tooltip
 contentStyle={{
    backgroundColor: "transparent",
    border: "none",
    boxShadow: "none",
  }}
  labelStyle={{
    backgroundColor: "transparent",
  }}

      labelFormatter={(value) =>
        new Date(value).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "2-digit", hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true  }) }
    />
<Legend
  onClick={toggleLine}
  formatter={(value) => (
    <span
      style={{
        color: visible[value as keyof typeof visible] ? "#000" : "#999",
        opacity: visible[value as keyof typeof visible] ? 1 : 0.4,
      }}
    >
      {value}
    </span>
  )}
/>



 <Line
  dataKey="humidity"
  stroke="#3B82F6"
  strokeOpacity={visible.humidity ? 1 : 0.2}
  hide={!visible.humidity}   // optional
  animationDuration={300}
  animationEasing="linear"
  type="monotone"
  strokeWidth={1}

  dot={{
    r: 1,              // inner radius / dot size
  //  fill: "#ffffff",   // inside color
   // stroke: "#ef4444", // border color
    strokeWidth: 1,    // border thickness
  }}
  activeDot={{
    r: 3,
   // fill: "#ef4444",
   // stroke: "#ffffff",
    strokeWidth: 1,
  }}



/>

<Line
  dataKey="tempAHT"
  stroke="#EF4444"
  strokeOpacity={visible.tempAHT ? 1 : 0.2}
  hide={!visible.tempAHT}   // optional
  animationDuration={300}
  animationEasing="linear"
 
  dot={{
    r: 1,              // inner radius / dot size
   // fill: "red",   // inside color
  // stroke: "#ef4444", // border color
    strokeWidth: 1,    // border thickness
  }}
  activeDot={{
    r: 3,
    //fill: "red",
   // stroke: "#ffffff",
    strokeWidth: 1,
  }}

  type="monotone"
  strokeWidth={1}
/>
</LineChart>
</ResponsiveContainer>
    </div>
  );
}

