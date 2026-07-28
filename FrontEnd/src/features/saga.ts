import { takeEvery,  delay, fork, call, put, takeLatest } from "redux-saga/effects";
import { updateDevice, updateDevicesamples } from "./WebsocketDataSlice";
import { loginApi } from "../services/authService";
import { deviceDataAPI } from "../services/deviceDataService";
import {deviceDataRequest, deviceData, } from "./deviceDataSlice";
import { loginFailure, loginRequest, loginSuccess } from "./authSlice";
import type { PayloadAction } from "@reduxjs/toolkit";



// ==============================
// 🟢 1. WebSocket Data Handling
// ==============================
// 👉 Worker saga
function* handleSocketData(action: any): any {
 //console.log("📩 [SAGA] Action received:", action);

 try {
    const data = action.payload;
    //console.log("Status", action.status);
//console.log("📦 [SAGA] Processing data:", data);
  //👉 इथे आपण WebSocket कडून आलेला data process करू शकतो validation, transformation, filtering वगैरे करू शकतो
    // 👉 Store in Redux
    yield put(updateDevice(data));
    yield put(updateDevicesamples(data));
    
    
    
    //console.log("✅ [SAGA] Data sent to reducer");
  } catch (error) {
   // console.error("Socket Error:", error);
  }
}
// 👉 Watcher saga
function* watchSocket() {  
  // 👉 SOCKET_DATA action आला की handleSocketData चालेल
  yield takeEvery("SOCKET_DATA", handleSocketData);
}

// ==============================
// 🟡 2. 1 Hour API Call (Background Job)
// ==============================
// 👉 Worker saga
function* hourlyApiCall(): any {
  while (true) {
    try {
    //  console.log("⏳ Calling API every 1 hour...");

      // 👉 Example API call
      //const res = yield call(fetch, "https://jsonplaceholder.typicode.com/posts");
      //const data = yield res.json();

      // 👉 Marathi:
      // इथे API response store करू शकतो
      // (तुम्ही दुसरा slice बनवू शकता)

     // console.log("✅ API Data:", data.length);

    } catch (error) {
    //  console.error("API Error:", error);
    }

    // 👉 Marathi:
    // 1 तास थांबा (1 hour delay)
    yield delay(60 * 60 * 1000);
  }}


// ==============================
// 🟡 3. Login Job
// ==============================
function* loginWorker(action: PayloadAction<{ email: string; password: string }>) {
  try {
    console.log("2. saga: loginWorker started", action.payload);
    const response: {success: boolean; body: string; token: string;} = yield call(loginApi, action.payload);
    console.log("4. saga: API response received", response);

    if (response.success) {
        console.log("4.1. saga: Dispatching loginSuccess" );
      yield put( loginSuccess({userName: response.body, token: response.token, })
      );
    } else {
      console.log("4.1. saga: Dispatching loginFailure" );
      yield put(loginFailure("Invalid login response"));
    }
  } catch (error: any) {
   console.log("4.1. saga: Dispatching error" );
    yield put(loginFailure(error.message || "Login failed"));
  }
}


function* deviveDataWorker(action: PayloadAction<{deviceid: string; startdate: string; enddate: string; limit: string; authToken: string }>) {

  try {
 
   const response: { success: boolean; count: number; data: any[];} = yield call(deviceDataAPI, action.payload);
   
    if (response.success) {
      
      yield put( deviceData({data: response.data}));
    } else {
   
     // yield put(loginFailure("Invalid login response"));
    }
  } catch (error: any) {

   // yield put(loginFailure(error.message || "Login failed"));
  }
}


// ==============================
// 🔴 Root Saga
// ==============================
export default function* rootSaga() {
  yield fork(watchSocket);     // listen websocket data
  yield fork(hourlyApiCall);   // run background job
  yield takeLatest(loginRequest.type, loginWorker); // login job
  yield takeLatest(deviceDataRequest.type, deviveDataWorker); // login job
}


/*call()      => await API
put()       => dispatch()
select()    => getState()
delay()     => setTimeout()
take()      => wait for action
takeLatest()=> only newest request
takeEvery()=> every request
fork()      => background task
Yield    => generator function
*/