import { combineReducers, configureStore } from "@reduxjs/toolkit";

const production = process.env.NODE_ENV === "production";

const rootReducer = combineReducers({});

export const store = configureStore({
  reducer: rootReducer,
  devTools: !production,
});
