import { createSlice } from "@reduxjs/toolkit";

interface IConfigState {
  timelineView: boolean;
};

const initialState: IConfigState = {
  timelineView: false
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    changeTimelineView: (state) => {
      state.timelineView = !state.timelineView;
    }
  }
});

export const { changeTimelineView } = configSlice.actions;
export default configSlice.reducer;