import { useState } from 'react';
import React from 'react';
import Card from './components/Card';
import WebSocketUI from './components/WebSocketUI' ;


const App: React.FC = () => {



 

  

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
      
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Analytics Overview</h1>
          <input placeholder="Search" className="px-4 py-2 rounded-lg border" />
        </div>

     <Card></Card>
<WebSocketUI></WebSocketUI>

        {/* Content */}
        <div className="grid grid-cols-3 gap-4">
          {/* Chart Section */}
          <div className="col-span-2 bg-white p-5 rounded-xl shadow">
            <h2 className="font-semibold mb-4">User Engagement Trends</h2>

            {/* Fake Chart */}
            <div className="h-64 flex items-end gap-2">
              {[40, 70, 50, 90, 60, 100, 80].map((h, i) => (
                <div
                  key={i}
                  className="bg-blue-400 w-full rounded"
                  style={{
                    height: `${h}%`,
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-4">
            {/* Traffic */}
            <div className="bg-white p-4 rounded-xl shadow">
              <h2 className="font-semibold mb-3">Traffic Sources</h2>
              <div className="space-y-2 text-sm">
                <p>Organic Search - 46%</p>
                <p>Direct - 28%</p>
                <p>Referral - 17%</p>
              </div>
            </div>

            {/* Top Pages */}
            <div className="bg-white p-4 rounded-xl shadow">
              <h2 className="font-semibold mb-3">Top Pages</h2>

              {[
                {
                  name: '/home',
                  value: 400,
                },
                {
                  name: '/features',
                  value: 300,
                },
                {
                  name: '/pricing',
                  value: 180,
                },
              ].map((item, i) => (
                <div key={i} className="mb-2">
                  <div className="flex justify-between text-sm">
                    <span>{item.name}</span>
                    <span>{item.value}</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded mt-1">
                    <div
                      className="bg-blue-500 h-2 rounded"
                      style={{
                        width: `${item.value / 4}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
