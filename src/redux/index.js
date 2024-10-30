import { configureStore } from "@reduxjs/toolkit";

import { testsSlice } from "./slices/testsSlice";
import { authSlice } from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    tests: testsSlice.reducer,
  },
});
