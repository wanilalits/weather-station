// features/deviceSlice.ts
import { createSlice } from "@reduxjs/toolkit";        // ✅ value
import type { PayloadAction } from "@reduxjs/toolkit"; // ✅ type
// 👉 Device data type (तुमचा sensor structure)



type DeviceData = {deviceId: string | null ;[key: string]: string | number | null;};
type DeviceState = {
  devices: Record<string, DeviceData[]>; // key = deviceId → latest data (फक्त latest record ठेवतो)
  devices1: Record<string, DeviceData[]>;  // last 20 samples
};


const initialState: DeviceState = {
  devices: {},
   devices1: {},   // ✅ for 20 samples
};

const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {  
    // ✅ Store latest data per device
   
updateDevice(state, action: PayloadAction<DeviceData[]>) {
       const dataWithTime = action.payload.map(item => ({
    ...item,
    timestampFront: new Date().toISOString(), // 🔥 unique + precise
  }));
      const data = dataWithTime;
      //console.log( typeof(data));
   //console.log(data[0]); 
//console.log("📦 [REDUCER] Updating device:", data.deviceId, data);
      // हा logic प्रत्येक device साठी फक्त latest data ठेवतो
      // जुना data overwrite होतो
      
     if (!data[0].deviceId) return;
state.devices[data[0].deviceId] = data;
 //  console.log (state.devices[2])
},

updateDevicesamples: (state, action : PayloadAction<DeviceData[]> ) => {
const dataArr = action.payload;     // array
const data = dataArr?.[0];
  if (!data?.deviceId) return;
const id = data.deviceId;
   // 1. init
  if (!state.devices1[id]) {
    state.devices1[id] = [];
  }

  const sampleWithTime = {
    ...data,
    time: data.time ?? new Date().toISOString(),
  };

  // 2. push new sample
  state.devices1[id].push(sampleWithTime);
  // 3. keep last 20
  if (state.devices1[id].length > 300) {
    state.devices1[id].shift();
  }
 
},
    // Optional: clear all data
clearDevices(state) {
      state.devices = {};
    },
  },
});

export const { updateDevice, clearDevices, updateDevicesamples } = deviceSlice.actions;
export default deviceSlice.reducer;