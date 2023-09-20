import { TUser } from "@/types/User.Type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IUserState {
  user: TUser | null;
};

const initialState: IUserState = {
  user: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    }
  }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;