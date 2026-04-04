import { configureStore } from "@reduxjs/toolkit";
import betsReducer from "../features/bets/betsSlice";

export const store = configureStore({
  reducer: {
    bets: betsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;