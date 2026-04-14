// features/deviceSlice.ts

import { createSlice } from "@reduxjs/toolkit";        // ✅ value
import type { PayloadAction } from "@reduxjs/toolkit"; // ✅ type

// 👉 Device data type (तुमचा sensor structure)



type DeviceData = {
  deviceId: string | null ;
  [key: string]: string | number | null;
};

type DeviceState = {
  devices: Record<string, DeviceData[]>; 
  // key = deviceId → latest data (फक्त latest record ठेवतो)
};


const initialState: DeviceState = {
  devices: {},
};


const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {  
    // ✅ Store latest data per device
   
    updateDevice(state, action: PayloadAction<DeviceData[]>) {
      const data = action.payload;
      //console.log( typeof(data));
    // console.log(data[0].deviceId); 
//console.log("📦 [REDUCER] Updating device:", data.deviceId, data);
      // हा logic प्रत्येक device साठी फक्त latest data ठेवतो
      // जुना data overwrite होतो
      
     if (!data[0].deviceId) return;
state.devices[data[0].deviceId] = data;
    },

    // Optional: clear all data
    clearDevices(state) {
      state.devices = {};
    },
  },
});

export const { updateDevice, clearDevices } = deviceSlice.actions;
export default deviceSlice.reducer;