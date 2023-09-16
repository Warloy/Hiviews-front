import { configureStore } from "@reduxjs/toolkit";
import configReducer from "@/features/config/configSlice";

export const store = configureStore({
  reducer: {
    config: configReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;