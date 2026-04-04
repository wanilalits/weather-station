import {
     AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";

const data = [
  { value: 10 },
  { value: 15 },
  { value: 12 },
  { value: 18 },
  { value: 16 },
  { value: 22 },
  { value: 20 },
];

export default function MiniAreaChart() {
  return (
    <div className="  w-[70%] h-10 mt-5">
       <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            
            {/* Gradient Definition */}
            <defs>
              <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1d4ed8" stopOpacity={0.8}/>
                <stop offset="100%" stopColor="#ffffff" stopOpacity={0}/>
              </linearGradient>
            </defs>

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
      </div>

 
  );
}