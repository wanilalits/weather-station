
import { useEffect, useRef, useState } from "react";

// ✅ Type for incoming device data
type SensorData = {
  deviceId: string;
  tempAHT: string;
  humidity: string;
};

// ✅ Store latest data per device
type DeviceMap = {
  [deviceId: string]: SensorData;
};

export const useWebSocket = (url: string) => {
  const ws = useRef<WebSocket | null>(null);

  const [isConnected, setIsConnected] = useState(false);
  const [devices, setDevices] = useState<DeviceMap>({});

  // 🔥 Generate userId
  const generateUserId = () => {
    const ip = window.location.hostname;
    const port = window.location.port || "80";
    return `Frontend_${ip}_${port}`;
  };



  // 🔁 Reconnect logic
  const reconnectTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const connect = () => {
    //const deviceId = generateUserId();
    const deviceId = "frontend";
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log("✅ WS Connected");
      setIsConnected(true);

      // Send userId to server
      ws.current?.send(
        JSON.stringify([{
          deviceId,
        }])
      );  
    };

  ws.current.onmessage = (event) => {
      try {
        const data: SensorData[] = JSON.parse(event.data);
console.log (data)
        // ✅ Convert array → device map (keep latest per device)
       setDevices((prev) => {
          const updated = { ...prev };
          data.forEach((item) => {
            updated[item.deviceId] = item;
          });

          return updated;
        }); 
      } catch (err) {
        console.error("❌ Error parsing WS data:", err);
      }
    }; 

    ws.current.onerror = (err) => {
      console.error("❌ WS Error:", err);
    };

    ws.current.onclose = () => {
      console.log("🔌 WS Disconnected");
      setIsConnected(false);

      // 🔁 Auto reconnect after 3 sec
      reconnectTimeout.current = setTimeout(() => {
        console.log("🔁 Reconnecting...");
        connect();
      }, 3000);
    };
  };

  useEffect(() => {
    connect();

   return () => {
      ws.current?.close();
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
    }; 
  }, [url]);

  // 📤 Send message to server
  const sendMessage = (message: any) => {
   /*  if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    } else {
      console.warn("⚠️ WS not connected");
    } */
  };

  return {
    isConnected,
    devices,   // 🔥 latest device data
    sendMessage,
    
  };
};


 // const { isConnected, devices } = useWebSocket("ws://localhost:5000");