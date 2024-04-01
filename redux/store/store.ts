import { configureStore } from "@reduxjs/toolkit";
import userSlice, { UserSlice } from "../reducers/userReducer";

export default configureStore({
  reducer: {
    user: userSlice,
  },
});

export interface RootState {
  user: UserSlice;
}
