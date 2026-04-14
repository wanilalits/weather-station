// store.ts

import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga";
import deviceReducer from "../features/deviceSlice";
//console.log("🚀 [STORE] Creating Redux Store...");

// 👉 Create saga middleware
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    device: deviceReducer,
  },

  // 👉 IMPORTANT:
  // thunk disable करतो कारण आपण saga वापरत आहोत
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// 👉 Start saga
//console.log("✅ [STORE] Store Created");

sagaMiddleware.run(rootSaga);

//console.log("🔥 [SAGA] Saga Started");