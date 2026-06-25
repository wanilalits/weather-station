import {useEffect, useState} from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from "recharts";
import type { RootState } from '../features/store';
import { useDispatch, useSelector } from 'react-redux';
export default function Graph() { 
 
  const   data : any= [
        {
            "_id": "6a339f9f07d7be593229416e",
            "deviceId": "1",
            "humidity": 11,
            "time": "2026-06-18T07:34:55.673Z",
            "__v": 0,
            "bucket": 99
        },
        {
            "_id": "6a0173e40235c3baa8b06ebe",
            "deviceId": "1",
            "humidity": 40.3,
            "tempAHT": 36.1,
            "tempBMP": 37.2,
            "mx": 0,
            "my": 0,
            "mz": 0,
            "time": "2026-05-11T06:15:00.033Z",
            "__v": 0,
            "bucket": 91
        },
        {
            "_id": "69fac74cfeb4b83b8844c65e",
            "deviceId": "1",
            "humidity": 51.1,
            "tempAHT": 34,
            "tempBMP": 35.2,
            "mx": 0,
            "my": 0,
            "mz": 0,
            "time": "2026-05-06T04:45:00.094Z",
            "__v": 0,
            "bucket": 90
        },
        {
            "_id": "69f827d037b6f4910080887d",
            "deviceId": "1",
            "humidity": 44.9,
            "tempAHT": 34.6,
            "tempBMP": 35.8,
            "mx": 0,
            "my": 0,
            "mz": 0,
            "time": "2026-05-02T05:12:00.070Z",
            "__v": 0,
            "bucket": 89
        },
        {
            "_id": "69eefee4aedd880fa88e7dc0",
            "deviceId": "1",
            "humidity": 32.4,
            "tempAHT": 39.4,
            "tempBMP": 40.3,
            "mx": 0,
            "my": 0,
            "mz": 0,
            "time": "2026-04-27T06:15:00.091Z",
            "__v": 0,
            "bucket": 88
        },
        {
            "_id": "69e5cb6c19b701ed9178066b",
            "deviceId": "1",
            "humidity": 36.1,
            "tempAHT": 35.5,
            "tempBMP": 36.5,
            "mx": 0,
            "my": 0,
            "mz": 0,
            "time": "2026-04-20T06:45:00.036Z",
            "__v": 0,
            "bucket": 86
        },
        {
            "_id": "69dcbb1cd3e069095c97bcd3",
            "deviceId": "1",
            "humidity": 30.12,
            "tempAHT": 36.16,
            "tempBMP": 37.17,
            "mx": 0,
            "my": 0,
            "mz": 0,
            "time": "2026-04-13T09:45:00.014Z",
            "__v": 0,
            "bucket": 85
        },
        {
            "_id": "69d743e489ddfedffb4feebf",
            "deviceId": "1",
            "humidity": 50.69,
            "tempAHT": 32.82,
            "tempBMP": 33.97,
            "mx": 0,
            "my": 0,
            "mz": 0,
            "time": "2026-04-09T06:15:00.018Z",
            "__v": 0,
            "bucket": 84
        },
        {
            "_id": "69d3e190bb353c949e2e37e8",
            "deviceId": "1",
            "humidity": 39.33,
            "tempAHT": 32.41,
            "tempBMP": 33.48,
            "mx": 0,
            "my": 0,
            "mz": 0,
            "time": "2026-04-06T16:38:37.678Z",
            "__v": 0,
            "bucket": 83
        }
    
    ]
  const deviceData= useSelector((state: RootState) => state.DeviceData);

  const chartData = deviceData.map((item: any) => ({
  time: new Date(item.time).getTime(), // ISO date
  humidity: item.humidity?? null,
   tempAHT: item.tempAHT ?? null, // use null if missing
}));


const minTime = Math.min(...chartData.map((d:any) => d.time));
const maxTime = Math.max(...chartData.map((d:any) => d.time));

const numberOfLabels = 10;

const ticks = Array.from(
  { length: numberOfLabels },
  (_, i) =>
    minTime +
    ((maxTime - minTime) * i) / (numberOfLabels - 1)
);




useEffect(() => {

}, []);


  return (
    //flex flex-wrap items-center gap-2 justify-between
   <div className="h-full shadow-lg p-1 flex flex-wrap items-center gap-1 justify-between">
  <ResponsiveContainer width="100%" height={250}  >
  <LineChart data={chartData}>
    <CartesianGrid strokeDasharray="3 3" />

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

    <YAxis />

    <Tooltip
      labelFormatter={(value) =>
        new Date(value).toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true
        })
      }
    />

    <Line dataKey="humidity" stroke="#3B82F6" />
    <Line dataKey="tempAHT" stroke="#EF4444" />
  </LineChart>
</ResponsiveContainer>
    </div>
  );
}

