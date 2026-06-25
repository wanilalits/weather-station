import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface LoginPayload {email: string; password: string;}
interface AuthState { loading: boolean; userName: string | null; token: string | null; error: string | null; isAuthenticated: boolean; loginToken?: string | null; }

const initialState: AuthState = {loading: false, userName: null, token: null, error: null, isAuthenticated: false,loginToken: null,};

const authSlice = createSlice({ name: "auth", initialState, reducers: {
    loginRequest: (state, action: PayloadAction<LoginPayload>) => {
     console.log("1. Slice reducer: loginRequest", action.payload);
      state.loading = true;
      state.error = null;
      //go to saga to handle login
    },

    loginSuccess: (state, action: PayloadAction<{ userName: string; token: string }>) => {
      console.log("5. reducer: loginSuccess", action.payload);
      state.loading = false;
      state.userName = action.payload.userName;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loginToken = action.payload.token;
      state.error = null;
    },

    loginFailure: (state, action: PayloadAction<string>) => {
      console.log("8. reducer: loginFailure", action.payload);
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },

    logout: (state) => {
      state.userName = null;
      state.loginToken = null;
      state.isAuthenticated = false;
      state.error = null;
    }, 

  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } =authSlice.actions;

export default authSlice.reducer;