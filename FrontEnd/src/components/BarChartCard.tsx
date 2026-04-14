import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type DataType = {
  name: string;
  value: number;
};

const data: DataType[] = [
  { name: "Mon", value: 40 },
  { name: "Tue", value: 55 },
  { name: "Wed", value: 30 },
  { name: "Thu", value: 80 },
  { name: "Fri", value: 65 },
  { name: "Sat", value: 50 },
  { name: "Sun", value: 70 },
    { name: "Mon", value: 40 },
  { name: "Tue", value: 55 },
  { name: "Wed", value: 30 },
  { name: "Thu", value: 80 },
  { name: "Fri", value: 65 },
  { name: "Sat", value: 50 },
  { name: "Sun", value: 70 },
    { name: "Mon", value: 40 },
  { name: "Tue", value: 55 },
  { name: "Wed", value: 30 },
  { name: "Thu", value: 80 },
  { name: "Fri", value: 65 },
  { name: "Sat", value: 50 },
  { name: "Sun", value: 70 },
    { name: "Mon", value: 40 },
  { name: "Tue", value: 55 },
  { name: "Wed", value: 30 },
  { name: "Thu", value: 80 },
  { name: "Fri", value: 65 },
  { name: "Sat", value: 50 },
  { name: "Sun", value: 70 },
    { name: "Mon", value: 40 },
  { name: "Tue", value: 55 },
  { name: "Wed", value: 30 },
  { name: "Thu", value: 80 },
  { name: "Fri", value: 65 },
  { name: "Sat", value: 50 },
  { name: "Sun", value: 70 },
    { name: "Mon", value: 40 },
  { name: "Tue", value: 55 },
  { name: "Wed", value: 30 },
  { name: "Thu", value: 80 },
  { name: "Fri", value: 65 },
  { name: "Sat", value: 50 },
  { name: "Sun", value: 70 },
    { name: "Mon", value: 40 },
  { name: "Tue", value: 55 },
  { name: "Wed", value: 30 },
  { name: "Thu", value: 80 },
  { name: "Fri", value: 65 },
  { name: "Sat", value: 50 },
  { name: "Sun", value: 70 },
];

export default function BarChartCard() {
  return (
  
<>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barSize={5}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          <Bar dataKey="value" className="fill-blue-500" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
   </>
  );
}