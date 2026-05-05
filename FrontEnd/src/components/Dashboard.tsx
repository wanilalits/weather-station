import { useEffect } from 'react';
import React from 'react';
import Card from './Card';
import { useWebSocket } from '../hooks/useWebSocket';
import DashboardHeader from './DashboardHeader';
import BarChartCard from './BarChartCard';


const App: React.FC = () => {

  const { connect, disconnect } = useWebSocket(); // ✅ only once
  useEffect(() => {
    connect(); // ✅ run once on mount
    return () => {
      disconnect(); // cleanup
    };
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside className="w-48 bg-blue-900 text-white p-5">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <nav className="space-y-4">
          <p className="bg-blue-700 p-2 rounded">Dashboard</p>
          <p className="opacity-80">Analytics</p>
          <p className="opacity-80">Reports</p>
          <p className="opacity-80">Users</p>
          <p className="opacity-80">Settings</p>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Header */}

        <DashboardHeader></DashboardHeader>
        <Card></Card>

        {/* Content */}
        <div className="grid grid-cols-3 gap-4">
          {/* Chart Section */}
          <div className="col-span-2 bg-white p-5 rounded-xl shadow">
            <h2 className="font-semibold mb-4"></h2>

            {/* Fake Chart */}
            <div className="h-64 flex items-end gap-2">
              <BarChartCard></BarChartCard>
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-4">
            {/* Traffic */}
            <div className="bg-white p-4 rounded-xl shadow">
              <h2 className="font-semibold mb-3">Traffic Sources</h2>
              <div className="space-y-2 text-sm">
                <p>Total Sensor Records - 2.4M</p>
                <p>Today’s Data Points - 18,240</p>
                <p>Database Size - 1.1 GB</p>
                <p>Storage Usage - 72%</p>
                <p>Active Devices - 8</p>
                <p>Avg Insert Rate - 5/sec</p>
                <p>Query Response Time - 120 ms</p>
                <p>Retention Period - 30 days</p>
              </div>
            </div>

            {/* Top Pages */}
            <div className="bg-white p-4 rounded-xl shadow">
              <h2 className="font-semibold mb-3">Top Sensor Activity</h2>

              {(() => {
                const data = [
                  { name: 'Temperature', value: 520 },
                  { name: 'Humidity', value: 430 },
                  { name: 'Pressure', value: 300 },
                ];

                const max = Math.max(...data.map((d) => d.value));

                return data.map((item, i) => (
                  <div key={i} className="mb-2">
                    <div className="flex justify-between text-sm">
                      <span>{item.name}</span>
                      <span>{item.value}</span>
                    </div>

                    <div className="w-full bg-gray-200 h-2 rounded mt-1">
                      <div
                        className="bg-blue-500 h-2 rounded"
                        style={{
                          width: `${(item.value / max) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
