import { useWebSocket } from "../hooks/useWebSocket";

export default function WebSocketUI() {
  const { isConnected, devices, sendMessage } = useWebSocket("wss://weather-station-ch7x.onrender.com/");
console.log("Devices in UI:", devices);
  return (
    <div>
      <h2>Status: {isConnected ? "🟢 Connected" : "🔴 Disconnected"}</h2>

  {Object.values(devices).map((device) => (
        <div key={device.deviceId}>
          <h3>Device {device.deviceId}</h3>
          <p>Temp: {device.tempAHT}</p>
          <p>Humidity: {device.humidity}</p>
        </div>
      ))}  
    </div>
  );
}