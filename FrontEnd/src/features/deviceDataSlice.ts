import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {SensorData, APIRequest} from '../types/interface_1'




const initialState: SensorData[] = []

const deviceDataSlice = createSlice({ name: "DeviceData", initialState, reducers: {
   //                   output, input
   //deviceDataRequest: (state, action: PayloadAction<APIRequest>) => {
    deviceDataRequest: (state, ) => {
    },



deviceData: (state, action: PayloadAction<{ data: SensorData[] }>) => {
  state.push(...action.payload.data);
},



clearDeviceData: () => {
     return [];
 },
  },
});

export const { deviceDataRequest, deviceData, clearDeviceData } =deviceDataSlice.actions;

export default deviceDataSlice.reducer;