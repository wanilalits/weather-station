//import React from "react";
import ReactDOM from "react-dom/client";
import App from './App.tsx'
import './index.css'


import { StrictMode } from 'react'
//import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import { store } from "./features/store.ts"; // ✅ IMPORTANT

ReactDOM.createRoot(document.getElementById('root')!).render(
<StrictMode> 
     <Provider store={store}>
      <App />
    </Provider>
   </StrictMode>, 
)








