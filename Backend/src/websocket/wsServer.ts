import WebSocket, { WebSocketServer } from 'ws';
import { Server } from 'http';

let wss: WebSocketServer;
export var latestData: Array<Record<string, any>> = []; // Buffer
export var exportData: Array<Record<string, any>> = []; // Buffer
// ✅ INIT (attach to HTTP server)

export const initWebSocket = (server: Server) => {
  wss = new WebSocketServer({ server });
  console.log('✅ WebSocket server started');

  wss.on('connection', (ws: any, req) => {
    const ip = req.socket.remoteAddress;
    const port = req.socket.remotePort;
    console.log(`✅ Client connected: ${ip}:${port}`);

    // ✅ initialize
    ws.isAlive = true;
    ws.deviceId = null;

  // ✅ HEARTBEAT (pong)
    ws.on('pong', () => {
      ws.isAlive = true;
    })

    // ✅ Send welcome message when client connected
    onconnection(ws, req);
   
// ✅ HANDLE MESSAGES
    onmessage(ws);

    // ✅ HANDLE CLOSE (cleanup)
    ws.on('close', () => {
      console.log(`❌ Disconnected: ${ws.deviceId}`);

      if (ws.deviceId) {
        console.log(`❌ Disconnected: ${ws.deviceId}`);
      }
    });
  });

  // ✅ GLOBAL HEARTBEAT CHECK (every 1 min)
  setInterval(() => {
    console.log('🔍 Checking clients...');
    wss.clients.forEach((ws: any) => {
      if (!ws.isAlive) {
        console.log(`❌ Terminating: ${ws.deviceId}`);
        return ws.terminate();
      }
      ws.isAlive = false;
      ws.ping();
    });
  }, 60000);
};

  const onconnection = (ws: any, req: any) => {
    const ip = req.socket.remoteAddress;
    const port = req.socket.remotePort;
    console.log(`✅ Client connected: ${ip}:${port}`);
    ws.send(JSON.stringify([{ deviceId: ws.deviceId, type: 'welcome' }]));
  };

  const onmessage = (ws: any) => {
    ws.on('message', (req: any) => {
      try {
        const data = JSON.parse(req.toString());
      // ✅ assign deviceId once
        if (ws.deviceId == null && data[0].deviceId) {
        console.log('deviceId allowed');
        ws.deviceId = data[0].deviceId;
      }
exportData=data;
      if (data[0].deviceId && !data[0].deviceId.startsWith('frontend') && !ws.deviceId.startsWith('frontend')) { 

  latestData.length = 0;
  latestData.push(...data);

  //exportData.length = 0;
  //.push(...data);  
  console.log(exportData)
//latestData = data; // overwrite buffer with latest (problem is that miltiple input devices will overwrite each other, solution is to store array of latest data for each device and update based on deviceId)     
console.log('📡 broadcasting to frontend only');
        wss.clients.forEach((client: any) => {
            if (client.deviceId && client.deviceId.startsWith('frontend') && client.readyState === 1) {
            client.send(JSON.stringify(data));
          }
        });
      }
      
       } catch (err) {
      console.log('❌ Invalid JSON');
    }
    });
  };




