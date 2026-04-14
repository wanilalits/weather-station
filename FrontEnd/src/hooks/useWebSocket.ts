import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

export const useWebSocket = () => {
  const dispatch = useDispatch();

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<any>(null);

  const [isConnected, setIsConnected] = useState(false);

  const WS_URL = "wss://weather-station-ch7x.onrender.com/";

  // 🔌 Connect function
  const connect = () => {
    console.log("🔌 [WS] Trying to connect...");

    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("✅ [WS] Connected");
      setIsConnected(true);
sendinitialMessage();
    };

    ws.onmessage = (event) => {
      //console.log("📩 [WS] Raw message:", event.data);

      try {
        const data = JSON.parse(event.data);

        //console.log("📦 [WS] Parsed data:", data);

        dispatch({
          type: "SOCKET_DATA",
          payload: data,
        });

        //console.log("📤 [WS] Dispatched SOCKET_DATA");
      } catch (err) {
        //console.error("❌ [WS] JSON Parse Error:", err);
      }
    };

    ws.onerror = (err) => {
      //console.error("❌ [WS] Error:", err);
    };

    ws.onclose = () => {
     // console.log("🔴 [WS] Disconnected");
      setIsConnected(false);

      // 🔁 Reconnect after delay
      reconnect();
    };
  };

  // 🔁 Reconnect logic
  const reconnect = () => {
    //console.log("⏳ [WS] Reconnecting in 3 sec...");

    reconnectTimeout.current = setTimeout(() => {
      connect();
    }, 3000);
  };

  // ❌ Disconnect manually
  const disconnect = () => {
    //console.log("🛑 [WS] Manual disconnect");

    if (reconnectTimeout.current) {
      clearTimeout(reconnectTimeout.current);
    }

    wsRef.current?.close();
  };


 // ▶️ Send initial message
  const sendinitialMessage = () => {
    if (wsRef.current && wsRef.current.readyState === 1) {
     const msg=[{"deviceId":"frontend"}]
      wsRef.current.send(JSON.stringify(msg));
    //  console.log("📤 [WS] Sent:", msg);
    } else {
     // console.warn("⚠️ [WS] Not connected");
    }
  };

  // ▶️ Send message
  const sendMessage = (msg: any) => {
    if (wsRef.current && wsRef.current.readyState === 1) {
      wsRef.current.send(JSON.stringify(msg));
     // console.log("📤 [WS] Sent:", msg);
    } else {
     // console.warn("⚠️ [WS] Not connected");
    }
  };




  // 🚀 Auto connect on mount
  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, []);

  return {
    isConnected,
    sendMessage,
    connect,     // 👉 manual connect
    disconnect,  // 👉 manual disconnect
  };
};