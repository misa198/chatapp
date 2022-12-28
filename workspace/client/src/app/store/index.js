import { combineReducers, configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";

const production = process.env.NODE_ENV === "production";

const rootReducer = combineReducers({
  auth,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: !production,
});
