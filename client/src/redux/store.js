import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./reducers/UserReducer";
import LogDataReducer from "./reducers/LogsDataReducer";
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    UserReducer,
    LogDataReducer
  },
});
setupListeners(store.dispatch)