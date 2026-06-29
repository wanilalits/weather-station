import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

export const useWebSocket = () => {
  const dispatch = useDispatch();

  // WebSocket instance
  const wsRef = useRef<WebSocket | null>(null);

  // Reconnect timeout reference
  const reconnectTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Last time data was received
  const lastMessageTimeRef = useRef<number>(Date.now());

  // Interval to check if data timeout occurred
  const dataTimeoutIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  );

  // Connection state
  const [isConnected, setIsConnected] = useState(false);

  // WebSocket server URL
  const WS_URL = "wss://weather-station-ch7x.onrender.com/";
    //const WS_URL = "ws://localhost:5000";
//ws://localhost:5000

  // -------------------------------------------------------
  // Generate dummy data if socket is disconnected
  // or no data received for 10 seconds
  // -------------------------------------------------------
  const generateDummyData = () => {
    const dummyData = [{
      "deviceId":"1",
      tempAHT:  Math.floor(Math.random() * (34 - 28 + 1)) + 28, //34-25
      tempBMP : Math.floor(Math.random() * (34 - 28 + 1)) + 28, //34-25
      humidity: Math.floor(Math.random() * (61 - 32 + 1)) + 32, //61-32
      pressure: Math.floor(Math.random() * 20) + 800, // 1000-1019
      mx: Math.floor(Math.random() * 10) + 10, // 1000-1019
      my: Math.floor(Math.random() * 10) + 10, // 1000-1019
      mz: Math.floor(Math.random() * 10) + 10, // 1000-1019
      angle: Math.floor(Math.random() * 10) + 360, // 1000-1019
      timestamp: new Date().toISOString(),
      source: "dummy",
    }];

    //console.log("🟡 Dummy Data Generated:", dummyData);

    dispatch({
      type: "SOCKET_DATA",
      payload: dummyData,
    });
  };

  // -------------------------------------------------------
  // Start monitoring if no data received for 10 seconds
  // -------------------------------------------------------
  const startDataMonitor = () => {
    // Clear old interval if any
    if (dataTimeoutIntervalRef.current) {
      clearInterval(dataTimeoutIntervalRef.current);
    }

    dataTimeoutIntervalRef.current = setInterval(() => {
      const now = Date.now();
      const diff = now - lastMessageTimeRef.current;

      // If 10 sec passed without receiving data
      if (diff > 10000) {
      //  console.log("⚠️ No data received for 10 seconds");
        generateDummyData();

        // Reset timer so dummy data isn't generated every second
        lastMessageTimeRef.current = Date.now();
      }
    }, 1000); // check every second
  };

  // -------------------------------------------------------
  // Stop monitoring
  // -------------------------------------------------------
  const stopDataMonitor = () => {
    if (dataTimeoutIntervalRef.current) {
      clearInterval(dataTimeoutIntervalRef.current);
      dataTimeoutIntervalRef.current = null;
    }
  };

  // -------------------------------------------------------
  // Connect WebSocket
  // -------------------------------------------------------
  const connect = () => {
    // Prevent duplicate connections
    if (
      wsRef.current &&
      (wsRef.current.readyState === WebSocket.OPEN ||
        wsRef.current.readyState === WebSocket.CONNECTING)
    ) {
      return;
    }

    console.log("🔌 Connecting WebSocket...");

    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    // Connection opened
    ws.onopen = () => {
      console.log("✅ WebSocket Connected");

      setIsConnected(true);

      // Reset last message time
      lastMessageTimeRef.current = Date.now();

      // Start monitoring incoming data
      startDataMonitor();

      // Send initial message
      sendInitialMessage();
    };

    // Message received
    ws.onmessage = (event) => {
     // console.log("📩 Raw message:", event.data);

      try {
        const data = JSON.parse(event.data);

        // Update last message time
        lastMessageTimeRef.current = Date.now();

        dispatch({
          type: "SOCKET_DATA",
          payload: data,
        });
      } catch (err) {
        console.error("❌ JSON Parse Error:", err);
      }
    };

    // Error
    ws.onerror = (err) => {
      console.error("❌ WebSocket Error:", err);
    };

    // Connection closed
    ws.onclose = () => {
      console.log("🔴 WebSocket Disconnected");

      setIsConnected(false);

      // Stop timeout monitoring
      stopDataMonitor();

      // Show dummy data immediately
      generateDummyData();

      // Try reconnecting
      reconnect();
    };
  };

  // -------------------------------------------------------
  // Reconnect after 3 seconds
  // -------------------------------------------------------
  const reconnect = () => {
    if (reconnectTimeout.current) {
      clearTimeout(reconnectTimeout.current);
    }

    console.log("⏳ Reconnecting in 3 seconds...");

    reconnectTimeout.current = setTimeout(() => {
      connect();
    }, 3000);
  };

  // -------------------------------------------------------
  // Disconnect manually
  // -------------------------------------------------------
  const disconnect = () => {
    console.log("🛑 Manual Disconnect");

    // Stop reconnect
    if (reconnectTimeout.current) {
      clearTimeout(reconnectTimeout.current);
      reconnectTimeout.current = null;
    }

    // Stop data monitor
    stopDataMonitor();

    // Close socket
    wsRef.current?.close();
    wsRef.current = null;
  };

  // -------------------------------------------------------
  // Send initial message after connection
  // -------------------------------------------------------
  const sendInitialMessage = () => {
    if (
      wsRef.current &&
      wsRef.current.readyState === WebSocket.OPEN
    ) {
      const msg = [{ deviceId: "frontend" }];

      wsRef.current.send(JSON.stringify(msg));

      console.log("📤 Initial message sent:", msg);
    }
  };

  // -------------------------------------------------------
  // Send custom message
  // -------------------------------------------------------
  const sendMessage = (msg: any) => {
    if (
      wsRef.current &&
      wsRef.current.readyState === WebSocket.OPEN
    ) {
      wsRef.current.send(JSON.stringify(msg));

      console.log("📤 Message sent:", msg);
    } else {
      console.warn("⚠️ WebSocket not connected");
    }
  };

  // -------------------------------------------------------
  // Auto connect when hook mounts
  // -------------------------------------------------------
  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, []);

  // -------------------------------------------------------
  // Return values
  // -------------------------------------------------------
  return {
    isConnected,
    sendMessage,
    connect,
    disconnect,
  };
};