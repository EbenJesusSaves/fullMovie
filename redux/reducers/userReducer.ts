import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userprofile",
  initialState: {
    userData: {},
    isLogin: false,
  } as UserSlice,
  reducers: {
    loginUser: (state: UserSlice, { payload }: PayloadAction<UserSlice>) => {
      state.userData = payload.userData;
      state.isLogin = payload.isLogin;
    },
  },
});

export const { loginUser } = userSlice.actions;
export default userSlice.reducer;

export interface User {
  username: string;
  email: string;
  profile: string;
  token: string;
}

interface UserSlice {
  isLogin: boolean;
  userData: User;
}
