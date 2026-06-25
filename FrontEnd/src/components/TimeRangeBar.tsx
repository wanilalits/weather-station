import { useState } from "react";

export default function TimeRangeBar() {
  const [range, setRange] = useState("live");

  return (
    <div className="p-1">
      <div className="flex flex-wrap items-center gap-1 justify-between">
        
        <div className="flex flex-wrap gap-2">
        {["live", "daily", "weekly", "monthly", "yearly", "max", "custom"]
 .filter(item => !(range === "custom" && item === "custom"))
  .map((item) => (
    <button
      key={item}
      onClick={() => setRange(item)}
      className={`px-3 py-1 rounded-lg text-sm font-medium transition
      ${
        range === item
          ? "bg-blue-600 text-white"
          : "bg-gray-100 hover:bg-gray-200"
      }`}
    >
      {item.charAt(0).toUpperCase() + item.slice(1)}
    </button>
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