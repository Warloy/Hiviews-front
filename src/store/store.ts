import { configureStore } from "@reduxjs/toolkit";
import configReducer from "@/features/config/configSlice";
import reviewReducer from "@/features/reviews/reviewSlice";
import threadReducer from "@/features/threads/threadSlice"
import userReducer from "@/features/user/userSlice";

export const store = configureStore({
  reducer: {
    config: configReducer,
    reviews: reviewReducer,
    threads: threadReducer,
    user: userReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;