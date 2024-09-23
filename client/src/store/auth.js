import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";

//Redux State Persistence
const initialIsLogin =
  localStorage.getItem("isLogin") === "true" ? true : false;

const initialRole =
  localStorage.getItem("role") !== "customer"
    ? localStorage.getItem("role")
    : "customer";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: initialIsLogin,
    role: initialRole,
  },
  reducers: {
    login(state) {
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
    },
    changeRole(state, action) {
      const role = action.payload;
      state.role = role;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
