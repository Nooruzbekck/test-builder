import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    role: "GUEST",
    email: "admin@gmail.com",
    password: "admin123",
  },
});
