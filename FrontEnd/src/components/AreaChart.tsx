import {AreaChart, Area, ResponsiveContainer,YAxis,Tooltip } from "recharts";

import { useEffect, useRef, useState } from "react";

export default function MiniAreaChart(props : any) {
 type Samples = {
  value: number;
};

 
  //const samplesData= props.data
 
  
  //console.log(props.data)
const [samples20Ref, Setsamples20Ref] = useState<Samples[]>([]);
 
 

  const samples = () => {
  Setsamples20Ref(prev => [
    ...prev,
    { value: props.data }
  ].slice(-20)); // keep last 20
};
  
  
 useEffect(() => {
    if (!props.data) return;
    // update ref or perform other side effects when props.data changes
    samples()
   //console.log( samples20Ref.current);
  }, [props.mykey, props.data]);


  return (

    <ResponsiveContainer   width="100%"   >
          <AreaChart data={ samples20Ref}
           margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
          >
            
            
            {/* Gradient Definition */}
            <defs>
              <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1d4ed8" stopOpacity={0.8}/>
                <stop offset="100%" stopColor="#ffffff" stopOpacity={0}/>
              </linearGradient>
            </defs>

<YAxis domain={['dataMin - 0.5', 'dataMax + 0.5']} 
 axisLine={false}
  tickLine={false}
  tick={{ fontSize: 10,  }}
/>
<Tooltip content={({ payload }) => {
  if (!payload || !payload.length) return null;
  return (
    <div style={{  background: "rgba(255, 255, 255, 0.7)" , padding: 5 }}>
      {payload[0].value}
    </div>
  );
}} />

            {/* Area */}
            <Area
              type="monotone"
              dataKey="value"
              stroke="#1d4ed8"
              strokeWidth={2}
              fill="url(#colorBlue)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>


 
  );
}