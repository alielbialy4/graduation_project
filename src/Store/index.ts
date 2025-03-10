import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./userAthe";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Define RootState and AppDispatch types for usage with TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
