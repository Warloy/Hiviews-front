import { configureStore } from "@reduxjs/toolkit";
import configReducer from "@/features/config/configSlice";
import reviewReducer from "@/features/reviews/reviewSlice";
import userReducer from "@/features/user/userSlice";

export const store = configureStore({
  reducer: {
    config: configReducer,
    reviews: reviewReducer,
    user: userReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;