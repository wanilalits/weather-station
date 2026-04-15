// saga.ts

import { takeEvery, put, call, delay, fork } from "redux-saga/effects";
import { updateDevice } from "../features/deviceSlice";

// ==============================
// 🟢 1. WebSocket Data Handling
// ==============================

// 👉 Worker saga
function* handleSocketData(action: any): any {
 //console.log("📩 [SAGA] Action received:", action);
  try {
    const data = action.payload;
//console.log("📦 [SAGA] Processing data:", data);
  //👉 इथे आपण WebSocket कडून आलेला data process करू शकतो validation, transformation, filtering वगैरे करू शकतो
    // 👉 Store in Redux
    yield put(updateDevice(data));
    //console.log("✅ [SAGA] Data sent to reducer");
  } catch (error) {
   // console.error("Socket Error:", error);
  }
}

// 👉 Watcher saga
function* watchSocket() {
  // 👉 
  // SOCKET_DATA action आला की handleSocketData चालेल
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
      const res = yield call(fetch, "https://jsonplaceholder.typicode.com/posts");
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
  }
}


// ==============================
// 🔴 Root Saga
// ==============================

export default function* rootSaga() {
  yield fork(watchSocket);     // listen websocket data
  yield fork(hourlyApiCall);   // run background job
}