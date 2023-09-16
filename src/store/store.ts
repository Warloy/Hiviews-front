import { configureStore } from "@reduxjs/toolkit";
import configReducer from "@/features/config/configSlice";
import reviewReducer from "@/features/reviews/reviewSlice";

export const store = configureStore({
  reducer: {
    config: configReducer,
    reviews: reviewReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;