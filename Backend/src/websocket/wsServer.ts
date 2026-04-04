import WebSocket, { WebSocketServer } from 'ws';
import cron from 'node-cron';
import Sensor from '../modules/sensor/sensor.model';
import { Server } from 'http';

let wss: WebSocketServer;

// Buffer
const dataBuffer: any[] = [];

// ✅ Store active clients
const activeClients = new Map<string, WebSocket>();

// ✅ INIT (attach to HTTP server)
export const initWebSocket = (server: Server) => {
  wss = new WebSocketServer({ server });

  console.log('✅ WebSocket server started');

  wss.on('connection', (ws: any, req) => {
    const ip = req.socket.remoteAddress;
    const port = req.socket.remotePort;

    console.log(`✅ Client connected: ${ip}:${port}`);

    ws.isAlive = true;
    ws.deviceId = null;

    // ✅ welcome
    ws.send(
      JSON.stringify({
        type: 'welcome',
        message: 'Connected to server',
      })
    );

    // ✅ heartbeat pong
    ws.on('pong', () => {
      ws.isAlive = true;
    });

    // ✅ receive data
    ws.on('message', (message: any) => {
      try {
        const data = JSON.parse(message.toString());

        console.log('📩 Data received:', data);

        const { deviceId, humidity } = data;

        // ✅ register device
        if (deviceId) {
          ws.deviceId = deviceId;
          activeClients.set(deviceId, ws);
        }

        // ✅ store buffer
        dataBuffer.push({
          deviceId,
          humidity,
          time: new Date(),
        });

        // ✅ safe condition
        if (typeof humidity === 'number' && humidity > 70) {
          broadcast({
            type: 'alert',
            message: 'High humidity!',
            value: humidity,
          });
        }

        // ✅ ack
        ws.send(
          JSON.stringify({
            type: 'ack',
            status: 'received',
          })
        );
      } catch (err) {
        console.log('❌ Invalid JSON');
      }
    });

    // ✅ disconnect
    ws.on('close', () => {
      console.log('❌ Client disconnected');

      if (ws.deviceId) {
        activeClients.delete(ws.deviceId);
      }
    });
  });

  // 🔥 Heartbeat
  setInterval(() => {
    wss.clients.forEach((client: any) => {
      if (client.isAlive === false) {
        console.log('❌ Terminating dead client');

        if (client.deviceId) {
          activeClients.delete(client.deviceId);
        }

        return client.terminate();
      }

      client.isAlive = false;
      client.ping();
    });
  }, 30000);
};

// 🔥 Broadcast
const broadcast = (payload: any) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(payload));
    }
  });
};

// ✅ Active clients list
export const getActiveClients = () => {
  return Array.from(activeClients.keys());
};

// ✅ Send to specific device
export const sendToDevice = (deviceId: string, payload: any) => {
  const client = activeClients.get(deviceId);

  if (client && client.readyState === WebSocket.OPEN) {
    client.send(JSON.stringify(payload));
  }
};

// ✅ CRON JOB
cron.schedule('*/15 * * * *', async () => {
  console.log('⏱ Running 15-minute job...');

  if (dataBuffer.length === 0) {
    console.log('No data to save');
    return;
  }

  const batch = [...dataBuffer];
  dataBuffer.length = 0;

  try {
    await Sensor.insertMany(batch);
    console.log(`✅ Saved ${batch.length} records to DB`);
  } catch (error: any) {
    console.error('❌ Error saving data:', error.message);
  }
});