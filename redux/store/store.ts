import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../reducers/userReducer";

import { UserSlice, UserSliceForSelector } from "../../components/types/types";
import favoriteReducer from "../reducers/favoriteReducer";

const store = configureStore({
  reducer: {
    user: userSlice,
    favoriteMovies: favoriteReducer,
  },
});

export interface RootState {
  user: UserSlice;
}
export interface RootStateForSelectors {
  user: UserSliceForSelector;
}
export default store;
