import { TThread } from "@/types/Post.Type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IThreadState {
  threads: TThread[];
};

const initialState: IThreadState = {
  threads: []
};

const threadsSlice = createSlice({
  name: "threads",
  initialState,
  reducers: {
    updateThreads: (state, action: PayloadAction<TThread[]>) => {
      state.threads = action.payload
    },
  }
});

export const { updateThreads } = threadsSlice.actions;
export default threadsSlice.reducer;