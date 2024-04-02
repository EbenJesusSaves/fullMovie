import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../reducers/userReducer";
import { UserSlice } from "../../components/types/types";

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export interface RootState {
  user: UserSlice;
}
export default store;
