import { combineReducers, configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";
import conversations from "./conversationsSlice";

const production = process.env.NODE_ENV === "production";

const rootReducer = combineReducers({
  auth,
  conversations,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: !production,
});
